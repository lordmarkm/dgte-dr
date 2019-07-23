import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';

import { Subject, interval, Subscription, combineLatest } from 'rxjs';
import { flatMap, takeUntil } from 'rxjs/operators';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { TransactionService, AdminService, ProjectService } from '@los/core/services';
import { LoanSearch, Company, AdminUserInfo } from '@los/shared/models';
import { API_DATE_FORMAT } from '@los/shared/constants';
import { CreateTransactionModalComponent } from '../create-transaction-modal/create-transaction-modal.component';
import { UpdateTransactionModalComponent } from '../create-transaction-modal/update-transaction-modal.component';
import { ViewTransactionModalComponent } from '../view-transaction-modal/view-transaction-modal.component';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dgte-erp-txn-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnDestroy {
  public searchQuery: LoanSearch = new LoanSearch();
  public isLoading: boolean = false;
  public transactions: any[] = [];
  public noRecordsMsg: string = 'No records message';
  public project;

  private projectServiceSub;

  constructor(private modalService: NgbModal,
              private transactionService: TransactionService,
              private projectService: ProjectService,
              private adminService: AdminService,
              dropdowConfig: NgbDropdownConfig) {
    dropdowConfig.placement = 'bottom-right';
  }

  ngOnInit() {
    this.searchQuery.sort = 'createdDate,desc';
    this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
      this.project = proj;
      this.getTransactions();
    });
  }

  ngOnDestroy() {
    this.projectServiceSub.unsubscribe();
  }

  createTransaction() {
      if (!this.project) {
        console.error('No project selected!');
        return;
      }
      const modalRef = this.modalService.open(CreateTransactionModalComponent, { size: 'lg', backdrop: 'static', keyboard: false });
      modalRef.componentInstance.project = this.project;
      modalRef.result.then(txn => this.handleCreateTransactionResponse(txn));
  }

  handleCreateTransactionResponse(newTransaction) {
      console.log(newTransaction);
      if (newTransaction) {
        this.getTransactions();
      }
  }

  getTransactions() {
    this.isLoading = true;
    let transactionSearch = {
        sort: this.searchQuery.sort,
        size: 10,
        page: this.searchQuery.page,
        projectCode: this.project.code
    };

    this.transactionService.search(transactionSearch)
      .subscribe(page => {
        this.isLoading = false;
        this.transactions = page.content;
        this.searchQuery.totalElements = page.totalElements;
      }, err => {
        this.isLoading = false;
      });
  }

  public onSort(event): void {
    const column: string = event.column.prop;
    this.searchQuery.sort = `${column},${event.newValue}`;
    this.getTransactions();
  }

  public setPage(pageInfo) {
    const page = pageInfo.page - 1;
    this.searchQuery.setPageNumber(page);
    this.getTransactions();
  }

  viewTransaction(txn) {
    const modalRef = this.modalService.open(ViewTransactionModalComponent, { size: 'lg', keyboard: true });
    modalRef.componentInstance.project = this.project;
    modalRef.componentInstance.transaction = txn;
  }

  updateTransaction(txn) {
    const modalRef = this.modalService.open(UpdateTransactionModalComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.project = this.project;
    modalRef.componentInstance.transaction = txn;
    modalRef.result.then(txn => this.handleUpdateTransactionResponse(txn));
  }

  handleUpdateTransactionResponse(txn) {
    if (txn) {
      this.getTransactions();
    }
  }
}
