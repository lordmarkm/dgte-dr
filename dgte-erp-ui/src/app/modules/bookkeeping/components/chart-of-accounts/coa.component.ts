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
  public parentAccount: any;
  private projectServiceSub;

  constructor(private modalService: NgbModal,
              private projectService: ProjectService,
              private accountService: AccountService) { }

  ngOnInit() {
      console.log('ngOnInit');
      this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
          if (!proj.code) {
              return;
          }
          this.isLoading = true;
          delete this.parentAccount;
          this.accountService.findRootByProjectCode(proj.code).subscribe(parentAccount => {
              this.parentAccount = parentAccount;
              this.isLoading = false;
          },
          err => {
              this.isLoading = false;
          })
      });
  }

  ngOnDestroy() {
      console.log('ngOnDestroy');
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
