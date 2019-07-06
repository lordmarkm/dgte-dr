import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StoreService, LoansService } from '@los/core/services';
import { CompanyLoanSettings, LoanDetails, PersonalDetails } from '@los/shared/models';
import { validateAllFormFields } from '@los/shared/utils';

@Component({
  selector: 'los-comaker-login',
  templateUrl: './comaker-login.component.html',
  styleUrls: ['./comaker-login.component.scss']
})
export class ComakerLoginComponent implements OnInit {

  public companyLoanSettings: CompanyLoanSettings;
  public loginForm: FormGroup;
  public loanDetails: LoanDetails;
  public isLoading = false;
  private applicationCode: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private storeService: StoreService,
              private loanService: LoansService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      referenceNumber: [null, [Validators.required]],
      additionalNumber: [null, [Validators.required]]
    });

    this.storeService.get('companyLoanSettings')
      .subscribe((companyLoanSettings: CompanyLoanSettings) => {
        this.companyLoanSettings = companyLoanSettings;
      });

    // get param and retrieve loan information
    this.route.params.subscribe(params => {
      const { referenceId, coMakerId } = params;
      this.isLoading = false;
      this.loanService.getLoanDetailsWithCoMaker(referenceId, coMakerId)
        .subscribe((loanDetails: any) => {
          // convert data from backend
          loanDetails.term = loanDetails.termMonths;
          this.loanDetails = loanDetails;
          this.loanDetails.referenceNumber = referenceId;
          this.applicationCode = coMakerId;

          const coMakerPersonalDetails: any = loanDetails.comaker;
          delete coMakerPersonalDetails.presentAddress;
          delete coMakerPersonalDetails.permanentAddress;

          this.referenceNumber.setValue(referenceId);
          this.storeService.set('loanDetails', this.loanDetails);
          this.storeService.set('coMakerPersonalDetails', coMakerPersonalDetails);
          this.isLoading = false;
        }, err => {
          this.isLoading = false;
        });
    });
  }

  public login(): void {
    validateAllFormFields(this.loginForm);

    if (this.loginForm.valid) {
      this.loanService.loginAsCoMaker(this.referenceNumber.value)
        .subscribe(result => {
          if (result.valid) {
            this.loanDetails.referenceNumber = this.referenceNumber.value;
            this.loanDetails.applicationCode = this.applicationCode;
            this.loanDetails.verificationNumber = this.additionalNumber.value;

            this.storeService.set('loanDetails', this.loanDetails);
            this.router.navigate(['confirmation'], {relativeTo: this.route});
          } else {
            this.referenceNumber.setErrors({ invalidReferenceNumber: true });
          }
        });
    }
  }

  get referenceNumber() { return this.loginForm.get('referenceNumber'); }
  get additionalNumber() { return this.loginForm.get('additionalNumber'); }
}
