import { Component, OnInit, OnDestroy } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { ConfirmationModalService, AccountService, ProjectService, BalanceSheetService } from '@los/core/services';
import { Account } from '@los/shared/models';
import * as _ from 'lodash'
import { API_DATE_FORMAT } from '@los/shared/constants';
import { SelectDateRangeModalComponent } from '@los/shared/components';

@Component({
  selector: 'dgte-erp-balance-sheet',
  templateUrl: './comparative-balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class ComparativeBalanceSheetComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public error: string;
  private projectServiceSub;
  private project;

  public balanceSheet: any = {};
  public dateA;
  public dateB;

  constructor(private modalService: NgbModal,
              private confirmationModalService: ConfirmationModalService,
              private projectService: ProjectService,
              private accountService: AccountService,
              private balanceSheetService: BalanceSheetService) { }

  ngOnInit() {
      this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
        if (!proj.code) {
          return;
        }
        this.project = proj;

        //Defualt values = end of previous year & end of current year
        this.dateA = moment().subtract(1, 'year').endOf('year');
        this.dateB = moment().endOf('year');
        this.getComparativeBalanceSheet();
      });
  }

  ngOnDestroy() {
      this.projectServiceSub.unsubscribe();
  }

  getComparativeBalanceSheet() {
    delete this.error;
    this.isLoading = true;
    this.balanceSheetService.findComparativeBalanceSheetByProjectCodeAndAsOfDates(this.project.code,
        this.dateA.format(API_DATE_FORMAT),
        this.dateB.format(API_DATE_FORMAT)).subscribe(balanceSheet => {
        this.balanceSheet = balanceSheet;
        this.isLoading = false;
      },
      err => {
          this.isLoading = false;
          switch (err.status) {
            case 400:
              this.error = 'Error! Project balance sheet could not be generated.';
              break;
            default:
              this.error = 'An unexpected error has occurred! ' + err.error.message;
          }
      });
  }

  selectDates() {
    const modalRef = this.modalService.open(SelectDateRangeModalComponent, { size: 'sm', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.startDate = this.dateA.format('YYYY-MM-DD');
    modalRef.componentInstance.endDate = this.dateB.format('YYYY-MM-DD');
    modalRef.result.then(dateRange => this.handleNewDateRange(dateRange));
  }

  handleNewDateRange(dateRange) {
    if (!dateRange.startDate || !dateRange.endDate) {
      return;
    }
    this.dateA = moment(dateRange.startDate, 'YYYY-MM-DD');
    this.dateB = moment(dateRange.endDate, 'YYYY-MM-DD');
    this.getComparativeBalanceSheet();
  }

}
