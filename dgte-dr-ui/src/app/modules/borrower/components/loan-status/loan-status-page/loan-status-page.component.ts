import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { validateAllFormFields } from '@los/shared/utils';
import { LoansService, StoreService } from "@los/core/services";
import { APPLICATION_STATUS } from '@los/shared/constants';

@Component({
  selector: 'los-loan-status-page',
  templateUrl: './loan-status-page.component.html',
  styleUrls: ['./loan-status-page.component.scss']
})
export class LoanStatusPageComponent implements OnInit {
  public APPLICATION_STATUS = APPLICATION_STATUS;
  public completeLoanDetails;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loanService: LoansService,
              private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.get('completeLoanDetails').subscribe(loanDetails => {
      if (loanDetails) {
        this.completeLoanDetails = loanDetails;
      } else {
        this.router.navigateByUrl('/b/check-loan-status');
      }
    });
  }

  logout() {
    this.storeService.set('completeLoanDetails', {});
    this.router.navigateByUrl('/b/check-loan-status');
  }
}
