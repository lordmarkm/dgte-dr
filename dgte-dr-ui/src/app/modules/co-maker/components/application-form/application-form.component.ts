import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { WizardComponent, MovingDirection } from 'angular-archwizard';
import { zip, Subject, combineLatest } from 'rxjs';
const moment = require('moment');

import { StoreService, LoansService, ConfirmationModalService } from '@los/core/services';
import { CanComponentDeactivate } from '@los/core/interfaces';
import { UploadDocumentAttachmentsDetails, EmploymentDetails, PersonalDetails, CompleteAddress, AppState,
  AttachmentType } from '@los/shared/models';
import { PersonalDetailsFormComponent, CompleteAddressFormComponent, EmploymentDetailsFormComponent,
  UploadDocumentAttachmentsFormComponent } from '@los/shared/components';


@Component({
  selector: 'los-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  @ViewChild(WizardComponent) public wizard: WizardComponent;
  @ViewChild('coMakerEmploymentDetailsForm') private coMakerEmploymentDetailsForm: EmploymentDetailsFormComponent;
  @ViewChild('coMakerPersonalDetailsForm') private coMakerPersonalDetailsForm: PersonalDetailsFormComponent;
  @ViewChild('coMakerCompleteAddressForm') private coMakerCompleteAddressForm: CompleteAddressFormComponent;
  @ViewChild('uploadDocumentAttachmentsForm') private coMakerUploadDocumentAttachmentsForm: UploadDocumentAttachmentsFormComponent;
  @ViewChild('completeAddressPanel') completeAddressPanelEl: ElementRef;

  public appState: AppState;
  public employmentDetails: EmploymentDetails;
  public isAccepted = false;
  public isSubmitting = false;
  public createdDate: string;
  public exitCoMakerDetails = false;
  public exitUploadDocuments = false;
  public aFormGroup: FormGroup;
  public siteKey = '6LepuaAUAAAAAMyhQxsCcDYeqLYHGUiI1Ee7Stfi';
  public canSubmit = false;

  private $coMakerEmploymentDetailsSubmit: Subject<boolean> = new Subject<boolean>();
  private $coMakerPersonalDetailsSubmit: Subject<boolean> = new Subject<boolean>();
  private $coMakerCompleteAddressSubmit: Subject<boolean> = new Subject<boolean>();
  private $coMakerTenureSubmit: Subject<boolean> = new Subject<boolean>();
  private $employmentDetailsValid: Subject<boolean> = new Subject<boolean>();
  private $personalDetailsValid: Subject<boolean> = new Subject<boolean>();
  private $completeAddressValid: Subject<boolean> = new Subject<boolean>();
  private refreshListener;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private storeService: StoreService,
              private loansService: LoansService,
              private confirmationModalService: ConfirmationModalService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.storeService.getAppState().subscribe(appState => {
      this.appState = appState;
      if (appState.loanDetails.createdDate) {
        this.createdDate = moment(appState.loanDetails.createdDate).format('MMMM D, YYYY');
      }
    });

    // passively listen for both comaker forms success before proceeding with the next step
    zip(this.$coMakerPersonalDetailsSubmit, this.$coMakerCompleteAddressSubmit, this.$coMakerEmploymentDetailsSubmit)
      .subscribe(([isCpdSuccess, isCcaSuccess, isCeSuccess]) => {
        if (isCpdSuccess && isCcaSuccess && isCeSuccess) {
          this.wizard.navigation.goToStep(1);
        }
      });

    // passively listen for both borrower forms valid forms before enable can exit
    combineLatest(this.$employmentDetailsValid, this.$personalDetailsValid, this.$completeAddressValid)
      .subscribe(([isEdValid, isPDValid, isCAValid]) => {
        if (isEdValid && isPDValid && isCAValid) {
          this.exitCoMakerDetails = true;
        } else {
          this.exitCoMakerDetails = false;
        }
      });

    this.refreshListener = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', this.refreshListener);

    this.aFormGroup = this.formBuilder.group({
      formCheck: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.refreshListener);
  }

  canDeactivate() {
    return new Promise<boolean>((resolve, reject) => {
      this.confirmationModalService.confirm('Are you sure you want to go back?').result.then((result) => {
        if (result === 'confirm') {
          resolve(true);
        }
      }, (reason) => {
        resolve(false);
      });
    });
  }

  public submit(): void {
    const payload = this.generatePayload();

    this.isSubmitting = true;
    this.loansService.submitCoMakerLoanApplication(payload)
      .subscribe((resp) => {
        this.appState.loanDetails.referenceNumber = resp.loanReferenceNumber;
        this.storeService.set('loanDetails', this.appState.loanDetails);
        this.router.navigate(['../completion'], {relativeTo: this.route});
        this.isSubmitting = false;
      });
  }

  public generatePayload() {
    // deep clone appState so that it won't be change when we format the payload
    const appState: AppState = JSON.parse(JSON.stringify(this.appState));

    const payload: any = appState.coMakerPersonalDetails;
    payload.loanReferenceNumber = appState.loanDetails.referenceNumber;
    payload.acceptedTimeStamp = appState.loanDetails.coMakerAcceptedTimestamp;
    payload.verificationNumber = appState.loanDetails.verificationNumber;
    payload.applicationCode = this.appState.loanDetails.applicationCode;
    payload.dateOfBirth = moment(payload.dateOfBirth).format('YYYY-MM-DD');
    payload.permanentAddress = appState.coMakerCompleteAddress.permanent;
    payload.presentAddress = appState.coMakerCompleteAddress.present;
    payload.presentAddress.lengthOfStayYears = appState.coMakerCompleteAddress.periodOfStay.years;
    payload.presentAddress.lengthOfStayMonths = appState.coMakerCompleteAddress.periodOfStay.months;
    payload.presentAddress.city = payload.presentAddress.cityName;
    payload.permanentAddress.city = payload.permanentAddress.cityName;
    delete payload.presentAddress.cityName;
    delete payload.permanentAddress.cityName;

    payload.attachments = appState.uploadDocumentAttachmentsDetails.attachments;

    return payload;
  }

  public continue(redirect = true): void {
    const { currentStepIndex } = this.wizard.model;

    // trigger individual sub form submit function based on current wizard step
    if (currentStepIndex === 0) {
      this.coMakerEmploymentDetailsForm.submit(redirect);
      this.coMakerPersonalDetailsForm.submit(redirect);
      this.coMakerCompleteAddressForm.submit(redirect);
    } else if (currentStepIndex === 1) {
      this.coMakerUploadDocumentAttachmentsForm.submit(redirect);
    }

    window.scroll(0,0);
  }

  public goBackToStep(step): void {
    this.wizard.navigation.goToStep(step);
    window.scroll(0,0);
  }

  public scrollCompleteAddressIntoView() {
    // we need to add a timeout here because by the time the wizard transition and calls postFinalize(),
    // the element doesn't exist and we need to wait for it to render before scrolling into view
    setTimeout(() => {
      this.completeAddressPanelEl['elementRef'].nativeElement.scrollIntoView();
    }, 50);
  }

  /*** FORM CALLBACKS ***/
  // employment details
  public submitCoMakerEmploymentDetailsSuccess({redirect, employmentDetails}): void {
    this.storeService.set('coMakerEmploymentDetails', employmentDetails);
    if (redirect) {
      this.$coMakerEmploymentDetailsSubmit.next(true);
    }
  }
  public submitCoMakerEmploymentDetailsFailed(): void {
    this.$coMakerEmploymentDetailsSubmit.next(false);
  }
  public isCoMakerEmploymentDetailsValid(isValid): void {
    this.$employmentDetailsValid.next(isValid);
  }
  // personal details
  public submitCoMakerPersonalDetailsSuccess({redirect, personalDetails}): void {
    this.storeService.set('coMakerPersonalDetails', personalDetails);
    if (redirect) {
      this.$coMakerPersonalDetailsSubmit.next(true);
    }
  }
  public submitCoMakerPersonalDetailsFailed(): void {
    this.$coMakerPersonalDetailsSubmit.next(false);
  }
  public isCoMakerPersonalDetailsValid(isValid): void {
    this.$personalDetailsValid.next(isValid);
  }
  // complete address
  public submitCoMakerCompleteAddressSuccess({redirect, completeAddress} ): void {
    this.storeService.set('coMakerCompleteAddress', completeAddress);
    if (redirect) {
      this.$coMakerCompleteAddressSubmit.next(true);
    }
  }
  public submitCoMakerCompleteAddressFailed(): void {
    this.$coMakerCompleteAddressSubmit.next(false);
  }
  public isCoMakerCompleteAddressValid(isValid): void {
    this.$completeAddressValid.next(isValid);
  }
  public canExitCoMakerDetails: (MovingDirection) => boolean = (direction) => {
    switch (direction) {
      case MovingDirection.Forwards:
        return this.exitCoMakerDetails;
      case MovingDirection.Backwards:
        return true;
      case MovingDirection.Stay:
        return true;
    }
  }

  // upload
  public submitUploadDocumentAttachmentsSuccess({redirect, uploadDocumentAttachmentsDetails}) {
    this.storeService.set('uploadDocumentAttachmentsDetails', uploadDocumentAttachmentsDetails);
    if (redirect) {
      this.wizard.navigation.goToStep(2);
    }
  }
  public submitUploadDocumentAttachmentsFailed(): void { }
  public isUploadDocumentAttachmentsValid(isValid): void {
    this.exitUploadDocuments = isValid;
  }
  public canExitUploadDocuments: (MovingDirection) => boolean = (direction) => {
    switch (direction) {
      case MovingDirection.Forwards:
        return this.exitUploadDocuments;
      case MovingDirection.Backwards:
        return true;
      case MovingDirection.Stay:
        return true;
    }
  }
  /*** END UPLOAD FORM CALLBACKS ***/
}
