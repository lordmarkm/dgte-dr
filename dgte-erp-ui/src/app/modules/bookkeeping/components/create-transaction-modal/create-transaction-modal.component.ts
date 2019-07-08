import { Component, Input, OnInit} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService, TransactionService, AccountService } from '@los/core/services';

@Component({
  selector: 'erp-create-transaction-modal',
  templateUrl: './create-transaction-modal.component.html',
  styleUrls: ['./create-transaction-modal.component.scss']
})
export class CreateTransactionModalComponent implements OnInit {
  @Input() project;

  public hasError = false;
  public isLoading = false;
  public entries: any[] = [{
    account: null,
    debit: 0,
    credit: 0
  }];
  public accounts: any[] = [];

  private FIXED_CODE_ROOT: string = '1'

  constructor(public activeModal: NgbActiveModal,
              private confirmationModalService: ConfirmationModalService,
              private accountService: AccountService) {}

  ngOnInit() {
    this.isLoading = true;
    this.accountService.findRootByProjectCode(this.project.code).subscribe(rootAccount => {
      this.addChildlessAccounts(rootAccount);
      this.isLoading = false;
    }, err => {
      console.error(err);
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
      account: null,
      credit: 0,
      debit: 0
    });
  }

  saveTransaction() {
      this.activeModal.close({});
  }
}
