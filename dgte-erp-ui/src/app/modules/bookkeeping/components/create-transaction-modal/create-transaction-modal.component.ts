import { Component, Input, OnInit} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService, TransactionService } from '@los/core/services';

@Component({
  selector: 'erp-create-transaction-modal',
  templateUrl: './create-transaction-modal.component.html',
  styleUrls: ['./create-transaction-modal.component.scss']
})
export class CreateTransactionModalComponent implements OnInit {
  @Input() project;

  public hasError = false;
  public isSubmitting = false;

  constructor(public activeModal: NgbActiveModal,
              private confirmationModalService: ConfirmationModalService) {}

  ngOnInit() {
  }

  saveTransaction() {
      this.activeModal.close({});
  }
}
