import { Component, Input, OnInit} from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService, TransactionService, AccountService } from '@los/core/services';
const moment = require('moment');

@Component({
  selector: 'erp-update-transaction-modal',
  templateUrl: './create-transaction-modal.component.html',
  styleUrls: ['./create-transaction-modal.component.scss']
})
export class UpdateTransactionModalComponent implements OnInit {
  @Input() project;
  @Input() transaction;

  public modalSubtitle = 'Update Transaction';
  public hasError = false;
  public isLoading = false;
  public accounts: any = [];
  public totalDebit: number = 0;
  public totalCredit: number = 0;
  private FIXED_CODE_ROOT: string = '1'

  public entries: any = [];
  public error: string = '';
  public bodyError: string = '';

  constructor(public activeModal: NgbActiveModal,
              private confirmationModalService: ConfirmationModalService,
              private transactionService: TransactionService,
              private accountService: AccountService) {}

  ngOnInit() {
    this.isLoading = true;
    forkJoin(
      this.accountService.findRootByProjectCode(this.project.code),
      this.transactionService.findEntriesByTransactionCode(this.transaction.code)
    ).subscribe(([rootAccount, entries]) => {
      this.addChildlessAccounts(rootAccount);
      this.entries = entries;
      this.entries.forEach(entry => {
        entry.entryDate = moment(entry.entryDate, 'YYYY-MMM-DD').format('YYYY-MM-DD');
        entry.account = this.accounts.find(acct => acct.code === entry.account.code);
      });
      this.recomputeTotalDebit();
      this.recomputeTotalCredit();
      this.transaction.transactionDate = moment(this.transaction.transactionDate, 'YYYY-MMM-DD').format('YYYY-MM-DD');
      this.isLoading = false;
    },
    err => {
      this.bodyError = 'Unable to retrieve transaction details';
      this.isLoading = false;
    });
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
      entryDate: this.transaction.transactionDate,
      account: this.accounts[0],
      credit: 0,
      debit: 0
    });
  }

  removeEntry(idx) {
    this.entries.splice(idx, 1);
    this.recomputeTotalDebit();
    this.recomputeTotalCredit();
  }
  recomputeTotalDebit() {
    this.totalDebit = this.entries.reduce((totalDebit, entry) => totalDebit + entry.debit, 0);
    this.transaction.amount = this.totalDebit;
  }
  recomputeTotalCredit() {
    this.totalCredit = this.entries.reduce((totalCredit, entry) => totalCredit + entry.credit, 0);
  }

  saveTransaction() {
      if (this.totalDebit != this.totalCredit) {
        this.error = 'Total debit must equal total credit';
        return;
      } else if (this.totalDebit === 0) {
        this.error = 'Amount must be greater than 0';
        return;
      }
      this.isLoading = true;
      this.transactionService.saveTransactionWithEntries(this.transaction, this.entries).subscribe(transaction => {
          this.activeModal.close(transaction);
      },
      err => {
          switch (err.status) {
            case 400:
              if (err.error) {
                this.error = err.error.error;
              }
              break;
            default:
              this.error = 'Unable to save transaction';
          }
          this.isLoading = false;
      });
  }

  trackByFn(index) {
    return index;
  }
}
