import { Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '@los/core/services';

@Component({
  selector: 'erp-view-transaction-modal',
  templateUrl: './view-transaction-modal.component.html',
  styleUrls: ['./view-transaction-modal.component.scss']
})
export class ViewTransactionModalComponent implements OnInit {
  @Input() transaction;
  public project;
  public entries: any[] = [];
  public isLoading = true;

  constructor(public activeModal: NgbActiveModal,
    private transactionService: TransactionService) {}

  ngOnInit() {
    this.project = this.transaction.project;
    this.transactionService.findEntriesByTransactionCode(this.transaction.code).subscribe((entries: any[]) => {
      this.entries = entries;
      this.isLoading = false;
    },
    err => {
      this.isLoading = false;
    });
  }

}
