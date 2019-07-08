import { Component, OnInit, TemplateRef, AfterViewInit, OnDestroy } from '@angular/core';

import { Subject, interval, Subscription, combineLatest } from 'rxjs';
import { flatMap, takeUntil } from 'rxjs/operators';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { AccountService, ProjectService } from '@los/core/services';
import { LoanSearch, Company, AdminUserInfo } from '@los/shared/models';
import { API_DATE_FORMAT } from '@los/shared/constants';
import { CreateTransactionModalComponent } from '../create-transaction-modal/create-transaction-modal.component';

@Component({
  selector: 'dgte-erp-coa',
  templateUrl: './coa.component.html',
  styleUrls: ['./coa.component.scss']
})
export class CoaComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public error: string;
  public parentAccount: any;
  private projectServiceSub;

  constructor(private modalService: NgbModal,
              private projectService: ProjectService,
              private accountService: AccountService) { }

  ngOnInit() {
      this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
          if (!proj.code) {
              return;
          }
          this.isLoading = true;
          delete this.parentAccount;
          delete this.error;
          this.accountService.findRootByProjectCode(proj.code).subscribe(parentAccount => {
              this.parentAccount = parentAccount;
              this.isLoading = false;
          },
          err => {
              this.isLoading = false;
              switch (err.status) {
                case 400:
                  this.error = 'Error! Parent account could not be found.';
                  break;
                default:
                  this.error = 'An unexpected error has occurred! ' + err.error.message;
              }
          })
      });
  }

  ngOnDestroy() {
      this.projectServiceSub.unsubscribe();
  }

  createTransaction() {
      const modalRef = this.modalService.open(CreateTransactionModalComponent, { backdrop: 'static', keyboard: false });
      modalRef.componentInstance.project = {};
      modalRef.result.then(this.handleCreateTransactionResponse);
  }

  handleCreateTransactionResponse(newTransaction) {
      
  }

}
