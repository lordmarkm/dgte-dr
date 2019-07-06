import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { validateAllFormFields } from '@los/shared/utils';
import { fullNameValidator } from '@los/modules/borrower/validators';
import { LoansService, StoreService, AdminService } from '@los/core/services';
import { OtpModalComponent } from '../otp-modal/otp-modal.component';

@Component({
  selector: 'los-accept-loan-page',
  templateUrl: './accept-loan-page.component.html',
  styleUrls: ['./accept-loan-page.component.scss']
})
export class AcceptLoanPageComponent implements OnInit {
  public completeLoanDetails;
  public acceptForm: FormGroup;
  public rbankBranches = [];
  public isLoading = false;
  public validOtp = false;
  public company;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private modalService: NgbModal,
              private loanService: LoansService,
              private adminService: AdminService,
              private storeService: StoreService) {}

  ngOnInit() {
    this.acceptForm = this.formBuilder.group({
      paymentMethod: null,
      fullName: null,
      accept: [null, [Validators.required, Validators.pattern(/^ACCEPT$/)]]
    });

    this.adminService.getBranches().subscribe(resp => {
      this.rbankBranches = resp.results;
    });
    this.storeService.get('completeLoanDetails').subscribe(loanDetails => {
      if (loanDetails) {
        this.completeLoanDetails = loanDetails;
        this.isLoading = true;

        this.fullName.setValidators([Validators.required, fullNameValidator(this.completeLoanDetails.borrower.fullName)]);

        this.adminService.getCompany({ id: loanDetails.companyId })
          .subscribe(company => {
            this.isLoading = false;
            this.company = company;

            if (!this.company.rbankPayroll) {
              this.paymentMethod.setValidators(Validators.required);
              this.paymentMethod.valueChanges.subscribe(value => {
                console.log(value);
                if (value === 'mc') {
                  const payeeName = new FormControl(this.completeLoanDetails.borrower.fullName);
                  // payeeName.disable(true);
                  payeeName.disable();
                  this.acceptForm.addControl('payeeName', payeeName);
                  this.acceptForm.addControl('rbankBranch',  new FormControl(null, Validators.required));
                  this.acceptForm.removeControl('nameOfBank');
                  this.acceptForm.removeControl('accountName');
                  this.acceptForm.removeControl('accountNumber');
                } else if (value === 'instapay') {
                  this.acceptForm.addControl('nameOfBank', new FormControl(null, Validators.required));
                  this.acceptForm.addControl('accountName', new FormControl(null));
                  this.acceptForm.addControl('accountNumber', new FormControl(null, Validators.required));
                  this.acceptForm.removeControl('payeeName');
                  this.acceptForm.removeControl('rbankBranch');
                }
              });

              this.paymentMethod.setValue('mc');
            }
          }, err => {
            this.isLoading = false;
          });
      } else {
        this.router.navigateByUrl('/b/check-loan-status');
      }
    });
  }

  submit() {
    validateAllFormFields(this.acceptForm);

    if (this.acceptForm.valid) {
      this.isLoading = true;
      this.loanService.generateOtp(this.completeLoanDetails.loanReferenceNumber)
        .subscribe(resp => {
          this.isLoading = false;
          const modalRef = this.modalService.open(OtpModalComponent);
          modalRef.componentInstance.parsedMobileNumber = this.completeLoanDetails.borrower.mobileNumber.substr(-4);
          modalRef.componentInstance.loanReferenceNumber = this.completeLoanDetails.loanReferenceNumber;

          modalRef.result
            .then(valid => {
              let payload = {};
              const { value } = this.acceptForm;

              if (value.paymentMethod === 'mc') {
                payload = {
                  mcRBankBranch: value.brCode
                };
              } else if (value.paymentMethod === 'instapay') {
                payload = {
                  instaPayBank: value.nameOfBank,
                  instaPayAccountNumber: value.accountNumber,
                  instaPayAccountName: value.accountName
                };
              }

              this.isLoading = true;
              this.loanService.acceptLoan(this.completeLoanDetails.loanReferenceNumber, payload)
                .subscribe(resp => {
                  this.isLoading = false;
                  this.router.navigateByUrl('/b/accept-loan-completion');
                }, err => {
                  this.isLoading = false;
                });
            }).catch(_ => {
            this.validOtp = false;
          });
        }, err => {
          this.isLoading = false;
        });
    }
  }

  download() {
    this.loanService.getPromissoryNote().subscribe(resp => {
      console.log(resp);
    });

    this.loanService.getAmortizationSchedule(this.completeLoanDetails.loanReferenceNumber).subscribe(resp => {
      console.log(resp);
    });

    this.loanService.getTermsAndConditions().subscribe(resp => {

    })
  }

  logout() {
    this.storeService.set('completeLoanDetails', {});
    this.router.navigateByUrl('/b/check-loan-status');
  }

  get paymentMethod() { return this.acceptForm.get('paymentMethod'); }
  get payeeName() { return this.acceptForm.get('payeeName'); }
  get rbankBranch() { return this.acceptForm.get('rbankBranch'); }
  get nameOfBank() { return this.acceptForm.get('nameOfBank'); }
  get accountName() { return this.acceptForm.get('accountName'); }
  get accountNumber() { return this.acceptForm.get('accountNumber'); }
  get fullName() { return this.acceptForm.get('fullName'); }
  get accept() { return this.acceptForm.get('accept'); }
}
