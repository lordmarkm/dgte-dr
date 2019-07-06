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
  public searchQuery: LoanSearch = new LoanSearch();
  public isPendingLoading: boolean = false;
  public transactions: any[] = [];
  public noRecordsMsg: string = 'No records message';

  constructor(private modalService: NgbModal,
              private transactionService: TransactionService,
              private adminService: AdminService) { }

  ngOnInit() {
    this.searchQuery.sort = 'createdDate,desc';
    this.getTransactions();
  }

  getTransactions() {
    this.isPendingLoading = true;
    let transactionSearch = {
        sort: this.searchQuery.sort,
        size: 10
    };

    this.transactionService.search(transactionSearch)
      .subscribe(page => {
        this.isPendingLoading = false;
        this.transactions = page.content;
        this.searchQuery.totalElements = page.totalElements;
      }, err => {
        this.isPendingLoading = false;
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

}
