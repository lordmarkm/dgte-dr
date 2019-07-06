import { Component, OnInit, TemplateRef, } from '@angular/core';

import { Subject, interval, Subscription, combineLatest } from 'rxjs';
import { flatMap, takeUntil } from 'rxjs/operators';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { TransactionService, AdminService } from '@los/core/services';
import { LoanSearch, Company, AdminUserInfo } from '@los/shared/models';
import { ROLE, APPLICATION_STATUS, APPLICATION_STATUS_LABEL, LIST_EXTERNAL_APPLICATION_STATUS, API_DATE_FORMAT } from '@los/shared/constants';

@Component({
  selector: 'dgte-erp-txn-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  public plSearchQuery: LoanSearch = new LoanSearch();
  public isPendingLoading: boolean = false;
  public transaction: any;
  public transactions: any[] = [];

  constructor(private modalService: NgbModal,
              private transactionService: TransactionService,
              private adminService: AdminService) { }

  ngOnInit() {
    this.plSearchQuery.sort = 'createdDate,desc';
    this.transactionService.findByCode('5a02608d-29c8-4c6d-8abe-43c03b4c048e').subscribe(txn => this.transaction = txn);
  }

  getTransactions() {
    this.isPendingLoading = true;
    let transactionSearch = {
    };
    this.transactionService.search(transactionSearch)
      .subscribe(page => {
        this.isPendingLoading = false;
        this.transactions = page.content;
        this.plSearchQuery.totalElements = page.totalElements;
      }, err => {
        this.isPendingLoading = false;
      });
  }

  public onSort(table, event): void {
    const column: string = event.column.prop;
    this.plSearchQuery.sort = `${column},${event.newValue}`;
    this.getTransactions();
  }

  public setPage(table, pageInfo) {
    const page = pageInfo.page - 1;
    this.plSearchQuery.setPageNumber(page);
    this.getTransactions();
  }

}
