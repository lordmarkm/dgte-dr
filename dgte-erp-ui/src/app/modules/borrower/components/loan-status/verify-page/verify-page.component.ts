import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { validateAllFormFields } from '@los/shared/utils';
import { LoansService, StoreService } from "@los/core/services";

@Component({
  selector: 'los-verify-page',
  templateUrl: './verify-page.component.html',
  styleUrls: ['./verify-page.component.scss']
})
export class VerifyPageComponent implements OnInit {

  public verifyForm: FormGroup;
  public showInvalidPayloadMessage: boolean;
  public isSubmitting = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private loanService: LoansService,
              private storeService: StoreService) {}

  ngOnInit() {
    this.showInvalidPayloadMessage = false;
    this.verifyForm = this.formBuilder.group({
      loanReferenceNumber: [null, [Validators.required]],
      govtIdNumber: [null, [Validators.required]]
    });
  }

  public submit(): void {
    validateAllFormFields(this.verifyForm);
    this.showInvalidPayloadMessage = false;
    if (this.verifyForm.valid) {
      this.isSubmitting = true;

      this.loanService.verifyBorrower(this.verifyForm.value).subscribe(resp => {
        console.log(resp);

        this.storeService.set('completeLoanDetails', resp);
        this.isSubmitting = false;
        this.router.navigate(['../loan-status'], {relativeTo: this.route});


      }, err => {
        console.log(err);
        if (err.status === 400) {
          this.showInvalidPayloadMessage = true;
        }
        this.isSubmitting = false;
      });
    }
  }

  get loanReferenceNumber() { return this.verifyForm.get('loanReferenceNumber'); }
  get govtIdNumber() { return this.verifyForm.get('govtIdNumber'); }
}
