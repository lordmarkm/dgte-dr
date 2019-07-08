import { Component, Input, OnInit} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService, TransactionService, AccountService } from '@los/core/services';
const moment = require('moment');

@Component({
  selector: 'erp-create-transaction-modal',
  templateUrl: './create-transaction-modal.component.html',
  styleUrls: ['./create-transaction-modal.component.scss']
})
export class CreateTransactionModalComponent implements OnInit {
  @Input() project;

  public hasError = false;
  public isLoading = false;
  public accounts: any[] = [];
  public totalDebit: number = 0;
  public totalCredit: number = 0;
  private FIXED_CODE_ROOT: string = '1'

  public entries: any[] = [];
  public transaction: any;

  constructor(public activeModal: NgbActiveModal,
              private confirmationModalService: ConfirmationModalService,
              private transactionService: TransactionService,
              private accountService: AccountService) {}

  ngOnInit() {
    this.isLoading = true;
    this.accountService.findRootByProjectCode(this.project.code).subscribe(rootAccount => {
      this.addChildlessAccounts(rootAccount);
      this.entries.push({
          entryDate: moment().format('YYYY-MM-DD'),
          account: this.accounts[0],
          debit: 0,
          credit: 0
        });
      this.isLoading = false;
    }, err => {
      console.error(err);
      this.isLoading = false;
    });

    this.transaction = {
      project: this.project,
      description: 'Default project description',
      transactionDate: moment().format('YYYY-MM-DD'),
      amount: 0
    };
  }

  private addChildlessAccounts(account) {
    if ((!account.children || account.children.length == 0) && account.accountCode != this.FIXED_CODE_ROOT) {
      this.accounts.push(account);
    } else if (account.children && account.children.length > 0) {
      account.children.forEach(childAccount => {
        childAccount.parentAccountName = account.name;
        this.addChildlessAccounts(childAccount);
      });
    }
  }

  addEntry() {
    this.entries.push({
      entryDate: moment().format('YYYY-MM-DD'),
      account: this.accounts[0],
      credit: 0,
      debit: 0
    });
  }

  saveTransaction() {
      this.isLoading = true;
      this.transactionService.saveTransactionWithEntries(this.transaction, this.entries).subscribe(transaction => {
          this.activeModal.close(transaction);
      },
      err => {
          this.isLoading = false;
      });
  }
}
