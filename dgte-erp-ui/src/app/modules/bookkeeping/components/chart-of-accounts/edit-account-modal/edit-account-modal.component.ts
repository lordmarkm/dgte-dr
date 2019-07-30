import { Component, Input, OnInit} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService, AccountService } from '@los/core/services';
import { LIST_ACCOUNT_TYPE } from '@los/shared/constants';
const moment = require('moment');
import * as _ from 'lodash';

@Component({
  selector: 'erp-edit-account-modal',
  templateUrl: './edit-account-modal.component.html',
  styleUrls: ['./edit-account-modal.component.scss']
})
export class EditAccountModalComponent implements OnInit {
  @Input() account;
  @Input() rootAccount;
  @Input() parentAccount;
  @Input() project;

  public tempAccount;
  public isLoading = false;
  public error: string = '';
  public possibleParents = [];
  public LIST_ACCOUNT_TYPE = LIST_ACCOUNT_TYPE;

  constructor(public activeModal: NgbActiveModal,
              private accountService: AccountService) {}

  ngOnInit() {
    this.addPossibleParent(this.rootAccount);
    this.tempAccount = _.clone(this.account);
  }

  addPossibleParent(account) {
    if (account.code === this.account.code) {
      return;
    } else if (this.parentAccount && account.code === this.parentAccount.code) {
      this.account.parent = account;
    }

    this.possibleParents.push(account);
    if (account.children.length) {
      account.children.forEach(child => {
        this.addPossibleParent(child);
      });
    }
  }

  parentChanged() {
    this.tempAccount.type = this.tempAccount.parent.type;
  }

  saveAccount() {
      this.isLoading = true;
      this.tempAccount.project = this.project;

      //Fix for 'TypeError: Converting circular structure to JSON'
      if (this.tempAccount.parent) {
        this.tempAccount.parent = _.clone(this.tempAccount.parent);
        this.tempAccount.parent.children = [];
      }

      this.accountService.save(this.tempAccount).subscribe(account=> {
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
              console.log(err);
              this.error = 'Unable to save account';
          }
          this.isLoading = false;
      });
  }
}
