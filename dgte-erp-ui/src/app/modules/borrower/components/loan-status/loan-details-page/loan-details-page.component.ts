import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
const Decimal = require('decimal.js-light');

import { LoansService, StoreService, AdminService } from '@los/core/services';
import { AttachmentsModalComponent } from '@los/shared/components';
import { validateAllFormFields } from '@los/shared/utils';
import {CompanyLoanSettings} from '@los/shared/models';

@Component({
  selector: 'los-loan-status-page',
  templateUrl: './loan-details-page.component.html',
  styleUrls: ['./loan-details-page.component.scss']
})
export class LoanDetailsPageComponent implements OnInit {
  public completeLoanDetails;
  public reformattedRank;
  public computedMonthlyAmortization: number;

  private companyLoanSettings: CompanyLoanSettings;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private modalService: NgbModal,
              private loanService: LoansService,
              private adminService: AdminService,
              private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.get('completeLoanDetails').subscribe(loanDetails => {
      if (loanDetails) {
        this.completeLoanDetails = loanDetails;
        this.reformattedRank = this.formatValues(loanDetails.borrower.employmentDetails.rank);

        this.adminService.getCompany({ id: loanDetails.companyId })
          .subscribe(company => {
            const rank = loanDetails.borrower.employmentDetails.rank.split(' ').join('_').toUpperCase();
            this.adminService.getCompanyLoanSettings({ code: company.code.toUpperCase(), rank })
              .subscribe(companyLoanSettings => {
                this.companyLoanSettings = companyLoanSettings;
                this.computeMonthlyAmortization();
              }, err => {
                // this.isLoading = false;
              });
          });


      } else {
        this.router.navigateByUrl('/b/check-loan-status');
      }
    });
  }

  openAttachments() {
    const modalRef = this.modalService.open(AttachmentsModalComponent, { windowClass: 'attachments', size: 'lg' });
    modalRef.componentInstance.loanDetails = this.completeLoanDetails;
  }

  computeMonthlyAmortization() {
    const rate = this.companyLoanSettings.rate;
    const term = this.completeLoanDetails.termMonths;
    const amount = this.completeLoanDetails.amount;

    const addOnRate = new Decimal(rate).mul(term).div(100).add(1);
    const monthlyAmortization = new Decimal(amount).mul(addOnRate).div(term);

    this.computedMonthlyAmortization = monthlyAmortization.toNumber();
    this.completeLoanDetails.monthlyAmortizationAmount = this.computedMonthlyAmortization;
  }

  private formatValues(value): string {
    const newValue = value.replace(/_/g, ' ');
    const words = newValue.split(' ');
    for (let letterIndex = 0; letterIndex < words.length; letterIndex++ ) {
      const firstLetter = words[letterIndex].charAt(0).toUpperCase();
      words[letterIndex] = firstLetter + words[letterIndex].substr(1).toLowerCase();
    }
    return words.join(' ');
  }

  logout() {
    this.storeService.set('completeLoanDetails', {});
    this.router.navigateByUrl('/b/check-loan-status');
  }
}
