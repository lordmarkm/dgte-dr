import { Component, Input, OnInit} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService, LoansService } from '@los/core/services';
import { APPLICATION_STATUS } from '@los/shared/constants';

@Component({
  selector: 'los-update-loan-status-modal',
  templateUrl: './update-loan-status-modal.component.html',
  styleUrls: ['./update-loan-status-modal.component.scss']
})
export class UpdateLoanStatusModalComponent implements OnInit {
  @Input() loanDetails;
  @Input() status;

  public comment = '';
  public netPay: number;
  public hasError = false;
  public netPayVerified = false;
  public statuses = {
    verify: { label: 'Verify', labelPastTense: 'verified', value: APPLICATION_STATUS.FOR_HR_ENDORSEMENT },
    endorse: { label: 'Endorse', labelPastTense: 'endorsed', value: APPLICATION_STATUS.APPROVED },
    decline: { label: 'Decline', labelPastTense: 'declined', value: APPLICATION_STATUS.HR_REJECTED }
  };
  public isSubmitting = false;

  constructor(public activeModal: NgbActiveModal,
              private confirmationModalService: ConfirmationModalService,
              private loanService: LoansService) {}

  ngOnInit() {
    this.netPay = this.loanDetails.borrower.netPay || 0;
  }

  updateStatus() {
    if (this.status === 'decline' && this.comment === '') {
      this.hasError = true;
    } else {
      this.confirmationModalService.confirm().result.then((result) => {
        if (result === 'confirm') {
          this.isSubmitting = true;
          if (this.status === 'endorse') {
            let endorseBody = {
              amount: this.loanDetails.amount,
              monthlyAmortizationAmount : this.loanDetails.monthlyAmmortizationAmount,
              termMonths : this.loanDetails.termMonths,
              message : this.comment,
              netPay: this.netPay
            };
            this.loanService.endorseLoan(this.loanDetails.loanReferenceNumber, endorseBody)
              .subscribe(resp => {
                this.isSubmitting = false;
                this.activeModal.close({
                  refNo: this.loanDetails.loanReferenceNumber,
                  status: this.statuses[this.status].labelPastTense
                });
              }, err => {
                this.isSubmitting = false;
              });
          } else {
            this.loanService.updateLoanStatus(this.loanDetails.loanReferenceNumber, this.statuses[this.status].value, this.comment, this.netPay)
              .subscribe(resp => {
                this.isSubmitting = false;
                this.activeModal.close({
                  refNo: this.loanDetails.loanReferenceNumber,
                  status: this.statuses[this.status].labelPastTense
                });
              }, err => {
                this.isSubmitting = false;
              });
          }
        }
      }, (reason) => { });
    }
  }
}
