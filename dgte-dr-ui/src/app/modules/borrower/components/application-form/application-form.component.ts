import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { WizardComponent, MovingDirection } from 'angular-archwizard';
import { combineLatest, zip, Subject } from 'rxjs';
const moment = require('moment');

import { StoreService, LoansService, ConfirmationModalService } from '@los/core/services';
import { UploadDocumentAttachmentsDetails, EmploymentDetails, PersonalDetails, CompleteAddress, AppState,
  LoanDetails, AttachmentType } from '@los/shared/models';
import { UploadDocumentAttachmentsFormComponent, EmploymentDetailsFormComponent, PersonalDetailsFormComponent,
  CompleteAddressFormComponent } from '@los/shared/components';
import { CanComponentDeactivate } from '@los/core/interfaces';


@Component({
  selector: 'los-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  @ViewChild(WizardComponent) public wizard: WizardComponent;
  @ViewChild('employmentDetailsForm') private employmentDetailsForm: EmploymentDetailsFormComponent;
  @ViewChild('borrowerPersonalDetailsForm') private borrowerPersonalDetailsForm: PersonalDetailsFormComponent;
  @ViewChild('borrowerCompleteAddressForm') private borrowerCompleteAddressForm: CompleteAddressFormComponent;
  @ViewChild('borrowerUploadDocumentAttachmentsForm') private borrowerUploadDocumentAttachmentsForm: UploadDocumentAttachmentsFormComponent;
  @ViewChild('coMakerPersonalDetailsForm') private coMakerPersonalDetailsForm: PersonalDetailsFormComponent;
  @ViewChild('completeAddressPanel') completeAddressPanelEl: ElementRef;

  public appState: AppState;
  public loanDetails: LoanDetails;
  public employmentDetails: EmploymentDetails;
  public isAccepted = false;
  public isSubmitting = false;
  public employeeTenureInMonths = 0;
  public noComakerTenure = 0;
  public showComakerStep = true;
  public exitEmploymentDetails = false;
  public exitBorrowerDetails = false;
  public exitUploadDocuments = false;
  public exitComakerDetails = false;
  public aFormGroup: FormGroup;
  public siteKey = '6LepuaAUAAAAAMyhQxsCcDYeqLYHGUiI1Ee7Stfi';

  private $borrowerPersonalDetailsSubmit: Subject<boolean> = new Subject<boolean>();
  private $borrowerCompleteAddressSubmit: Subject<boolean> = new Subject<boolean>();
  private $borrowerPersonalDetailsValid: Subject<boolean> = new Subject<boolean>();
  private $borrowerCompleteAddressValid: Subject<boolean> = new Subject<boolean>();
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
      this.loanDetails = appState.loanDetails;
      this.employmentDetails = appState.borrowerEmploymentDetails;
      this.employeeTenureInMonths = this.employmentDetails.tenure.months + (this.employmentDetails.tenure.years * 12);
      this.noComakerTenure = appState.companyLoanSettings.noComakerTenure;

      if (this.employeeTenureInMonths >= this.noComakerTenure) {
        this.showComakerStep = false;
      }
    });

    // passively listen for both borrower forms success before proceeding with the next step
    zip(this.$borrowerPersonalDetailsSubmit, this.$borrowerCompleteAddressSubmit)
      .subscribe(([isBpdSuccess, isBcaSuccess]) => {
        if (isBpdSuccess && isBcaSuccess) {
          this.wizard.navigation.goToStep(2);
        }
      });

    // passively listen for both borrower forms valid forms before enable can exit
    combineLatest(this.$borrowerPersonalDetailsValid, this.$borrowerCompleteAddressValid)
      .subscribe(([isBpdValid, isBcaValid]) => {
        if (isBpdValid && isBcaValid) {
          this.exitBorrowerDetails = true;
        } else {
          this.exitBorrowerDetails = false;
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
    this.loansService.submitBorrowerLoanApplication(payload)
      .subscribe((resp) => {
        this.isSubmitting = false;
        this.appState.loanDetails.referenceNumber = resp.loanReferenceNumber;
        this.storeService.set('loanDetails', this.appState.loanDetails);
        this.router.navigate(['../completion'], {relativeTo: this.route});
      }, err => {
        this.isSubmitting = false;
      });
  }

  public generatePayload() {
    // deep clone appState so that it won't be change when we format the payload
    const appState: AppState = JSON.parse(JSON.stringify(this.appState));

    const borrower: any = appState.borrowerPersonalDetails;
    borrower.employmentDetails = appState.borrowerEmploymentDetails;
    borrower.permanentAddress = appState.borrowerCompleteAddress.permanent;
    borrower.presentAddress = appState.borrowerCompleteAddress.present;
    borrower.grossSalary = appState.loanDetails.grossSalary;
    borrower.netPay = borrower.grossSalary;
    borrower.acceptedTimeStamp = appState.loanDetails.borrowerAcceptedTimestamp;

    const coMaker: any = appState.coMakerPersonalDetails;
    coMaker.companyIdNumber = 12345;
    coMaker.govtIdType = 'Passport';

    // custom formats;
    borrower.employmentDetails.tenuredYears = appState.borrowerEmploymentDetails.tenure.years;
    borrower.employmentDetails.tenuredMonths = appState.borrowerEmploymentDetails.tenure.months;

    // convert date format - confirm with backend
    borrower.dateOfBirth = moment(borrower.dateOfBirth).format('YYYY-MM-DD');
    coMaker.dateOfBirth = moment(coMaker.dateOfBirth).format('YYYY-MM-DD');

    delete borrower.employmentDetails.tenure;
    /* tslint:disable:max-line-length*/
    // destructure with renaming
    const { homeNumber: bPermanentHomeNumber, streetNumber: bPermanentStreetNumber, streetName: bPermanentStreetName,
      province: bPermanentProvince, cityName: bPermanentCityName, zipCode: bPermanentZipCode } = this.appState.borrowerCompleteAddress.permanent;
    const { homeNumber: bPresentHomeNumber, streetNumber: bPresentStreetNumber, streetName: bPresentStreetName,
      province: bPresentProvince, cityName: bPresentCityName, zipCode: bPresentZipCode } = this.appState.borrowerCompleteAddress.present;

    borrower.permanentAddress.fullAddress = `${bPermanentHomeNumber}, ${bPermanentStreetNumber}, ${bPermanentStreetName}, ${bPermanentCityName}, ${bPermanentProvince}, ${bPermanentZipCode}`;
    borrower.presentAddress.fullAddress = `${bPresentHomeNumber}, ${bPresentStreetNumber}, ${bPresentStreetName}, ${bPresentCityName}, ${bPresentProvince}, ${bPresentZipCode}`;
    /* tslint:enable:max-line-length*/

    borrower.presentAddress.lengthOfStayYears = appState.borrowerCompleteAddress.periodOfStay.years;
    borrower.presentAddress.lengthOfStayMonths = appState.borrowerCompleteAddress.periodOfStay.months;
    borrower.presentAddress.city = borrower.presentAddress.cityName;
    borrower.permanentAddress.city = borrower.permanentAddress.cityName;
    delete borrower.presentAddress.cityName;
    delete borrower.permanentAddress.cityName;

    const payload: any = {};
    payload.borrower = borrower;
    payload.loansPurpose = appState.loanDetails.purpose;
    payload.amount = appState.loanDetails.amount;
    payload.companyId = appState.companyLoanSettings.company.id;
    payload.termMonths = appState.loanDetails.term;
    payload.attachments = appState.uploadDocumentAttachmentsDetails.attachments;
    payload.monthlyAmortizationAmount = appState.loanDetails.monthlyAmmortization;
    payload.rate = appState.loanDetails.rate;
    payload.addOnRate = appState.loanDetails.addOnRate;

    if (this.showComakerStep) {
      payload.comakers = [coMaker];
    }

    return payload;
  }

  public continue(redirect = true): void {
    const { currentStepIndex } = this.wizard.model;

    // trigger individual sub form submit function based on current wizard step
    if (currentStepIndex === 0) {
      this.employmentDetailsForm.submit(redirect);
    } else if (currentStepIndex === 1) {
      // submit both forms
      this.borrowerPersonalDetailsForm.submit(redirect);
      this.borrowerCompleteAddressForm.submit(redirect);
    } else if (currentStepIndex === 2) {
      this.borrowerUploadDocumentAttachmentsForm.submit(redirect);
    } else if (currentStepIndex === 3) {
      this.coMakerPersonalDetailsForm.submit(redirect);
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

  /*** EMPLOYMENT FORM CALLBACKS ***/
  public submitEmploymentDetailsSuccess({redirect, employmentDetails}): void {
    this.storeService.set('borrowerEmploymentDetails', employmentDetails);
    this.exitEmploymentDetails = true;
    if (redirect) {
      this.wizard.navigation.goToStep(1);
    }
  }
  public submitEmploymentDetailsFailed(): void { }
  public isEmploymentDetailsValid(isValid): void {
    this.exitEmploymentDetails = isValid;
  }
  public canExitEmploymentDetails: (MovingDirection) => boolean = (direction) => {
    switch (direction) {
      case MovingDirection.Forwards:
        return this.exitEmploymentDetails;
      case MovingDirection.Backwards:
        return true;
      case MovingDirection.Stay:
        return true;
    }
  }
  /*** END EMPLOYMENT FORM CALLBACKS ***/

  /*** BORROWER PERSONAL DETAILS FORM CALLBACKS ***/
  public submitBorrowerPersonalDetailsSuccess({redirect, personalDetails}): void {
    this.storeService.set('borrowerPersonalDetails', personalDetails);
    if (redirect) {
      this.$borrowerPersonalDetailsSubmit.next(true);
    }
  }
  public submitBorrowerPersonalDetailsFailed(): void {
    this.$borrowerPersonalDetailsSubmit.next(false);
  }
  public isBorrowerPersonalDetailsValid(isValid): void {
    this.$borrowerPersonalDetailsValid.next(isValid);
  }
  public submitBorrowerCompleteAddressSuccess({redirect, completeAddress}): void {
    this.storeService.set('borrowerCompleteAddress', completeAddress);
    if (redirect) {
      this.$borrowerCompleteAddressSubmit.next(true);
    }
  }
  public submitBorrowerCompleteAddressFailed(): void {
    this.$borrowerCompleteAddressSubmit.next(false);
  }
  public isBorrowerCompleteAddressValid(isValid): void {
    this.$borrowerCompleteAddressValid.next(isValid);
  }
  public canExitBorrowerDetails: (MovingDirection) => boolean = (direction) => {
    switch (direction) {
      case MovingDirection.Forwards:
        return this.exitBorrowerDetails;
      case MovingDirection.Backwards:
        return true;
      case MovingDirection.Stay:
        return true;
    }
  }
  /*** END BORROWER PERSONAL DETAILS FORM CALLBACKS ***/

  /*** CO-MAKER PERSONAL DETAILS FORM CALLBACKS ***/
  public submitCoMakerPersonalDetailsSuccess({redirect, personalDetails}): void {
    this.storeService.set('coMakerPersonalDetails', personalDetails);
    if (redirect) {
      this.wizard.navigation.goToStep(4);
    }
  }
  public submitCoMakerPersonalDetailsFailed(): void { }
  public isCoMakerPersonalDetailsValid(isValid): void {
    this.exitComakerDetails = isValid;
  }
  public canExitComakerDetails: (MovingDirection) => boolean = (direction) => {
    switch (direction) {
      case MovingDirection.Forwards:
        return this.exitComakerDetails;
      case MovingDirection.Backwards:
        return true;
      case MovingDirection.Stay:
        return true;
    }
  }
  /*** END CO-MAKER PERSONAL DETAILS FORM CALLBACKS ***/

  /*** UPLOAD FORM CALLBACKS ***/
  public submitUploadDocumentAttachmentsSuccess({redirect, uploadDocumentAttachmentsDetails}) {
    this.storeService.set('uploadDocumentAttachmentsDetails', uploadDocumentAttachmentsDetails);
    if (redirect) {
      this.wizard.navigation.goToStep(3);
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

  isFormComplete() {
    if (this.showComakerStep) {
      return this.exitEmploymentDetails && this.exitBorrowerDetails &&
             this.exitUploadDocuments && this.exitComakerDetails;
    } else {
      return this.exitEmploymentDetails && this.exitBorrowerDetails && this.exitUploadDocuments;
    }
  }

  formatValues(value): string {
    let newValue = value.replace(/_/g, " ");
    var words = newValue.split(" ");
    for ( var letterIndex = 0; letterIndex < words.length; letterIndex++ )
    {
      var firstLetter = words[letterIndex].charAt(0).toUpperCase();
      words[letterIndex] = firstLetter + words[letterIndex].substr(1).toLowerCase();
    }
    return words.join(" ");
  }
}
