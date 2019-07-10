import { Component, Input, OnInit} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService, AccountService } from '@los/core/services';
import { LIST_ACCOUNT_TYPE } from '@los/shared/constants';
const moment = require('moment');

@Component({
  selector: 'erp-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss']
})
export class CreateAccountModalComponent implements OnInit {
  @Input() parentAccount;
  @Input() project;
  public isLoading = false;
  public error: string = '';
  public account = {};
  public LIST_ACCOUNT_TYPE = LIST_ACCOUNT_TYPE;

  constructor(public activeModal: NgbActiveModal,
              private accountService: AccountService) {}

  ngOnInit() {
    this.account = {
      parent: this.parentAccount,
      accountCode: '',
      name: '',
      description: '',
      project: this.project,
      type: 'ASSET'
    };
  }

  saveAccount() {
      this.isLoading = true;
      this.accountService.save(this.account).subscribe(account=> {
          this.activeModal.close(account);
      },
      err => {
          switch (err.status) {
            case 400:
              if (err.error) {
                this.error = err.error.error;
              }
              break;
            default:
              this.error = 'Unable to save account';
          }
          this.isLoading = false;
      });
  }
}
