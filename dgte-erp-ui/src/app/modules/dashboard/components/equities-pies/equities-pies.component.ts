import { Component, OnInit, TemplateRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { Subject, interval, Subscription, combineLatest } from 'rxjs';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { ConfirmationModalService, AccountService, ProjectService, BalanceSheetService } from '@los/core/services';
import { LoanSearch, Company, AdminUserInfo, Account } from '@los/shared/models';
import { API_DATE_FORMAT } from '@los/shared/constants';
import * as _ from 'lodash'

@Component({
  selector: 'dgte-erp-dashboard-equities-pies',
  templateUrl: './equities-pies.component.html',
  styleUrls: ['./equities-pies.component.scss']
})
export class EquitiesPiesComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public error: string;
  private projectServiceSub;
  private project;
  private balanceSheet;

  public title = 'Browser market shares at a specific website, 2014';
  public type='PieChart';

  public data = [];
  //This will be a parallel to this.data and is used on drilldown
  public accountBalancesInPie = [];
  public parentAccountBalances = [];
  private displayedAccountBalance;

  public columnNames = ['Account', 'Percentage'];
  public options = {
  };

  public width = 480;
  public height = 240;

  constructor(private modalService: NgbModal,
              private confirmationModalService: ConfirmationModalService,
              private projectService: ProjectService,
              private accountService: AccountService,
              private balanceSheetService: BalanceSheetService) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
      if (!proj.code) {
          return;
      }
      this.project = proj;
      delete this.error;
      this.preparePieChart();
    });
  }

  ngOnDestroy() {
      this.projectServiceSub.unsubscribe();
  }

  preparePieChart() {
    this.isLoading = true;
    this.balanceSheetService.findByProjectCodeAndAsOfDate(this.project.code, moment().format(API_DATE_FORMAT)).subscribe(balanceSheet => {
        this.balanceSheet = balanceSheet;
        if (balanceSheet.equities.length) {
          this.generatePieChart(balanceSheet.equities[0]);
        }
        this.isLoading = false;
      },
      err => {
          this.isLoading = false;
          switch (err.status) {
            case 400:
              this.error = 'Error! Chart could not be generated.';
              break;
            default:
              this.error = 'An unexpected error has occurred! ' + err.error.message;
          }
      });
  }

  generatePieChart(accountBalance) {
    this.title = accountBalance.account.name;
    this.data = [];
    this.accountBalancesInPie = [];
    this.displayedAccountBalance = accountBalance;
    accountBalance.children.forEach(childAccountBalance => {
      if (childAccountBalance.balance && childAccountBalance.balance > 0) {
        this.data.push([childAccountBalance.account.name, childAccountBalance.balance]);
        this.accountBalancesInPie.push(childAccountBalance);
      }
    });
  }

  onSelect(evt) {
    if (evt.length) {
      let selectedAccount = this.accountBalancesInPie[evt[0].row];
      if (selectedAccount.children && selectedAccount.children.length) {
        this.parentAccountBalances.push(this.displayedAccountBalance);
        this.generatePieChart(selectedAccount);
      }
    }
  }

  onReady() {
    //this.isLoading = false;
  }

  onUpOneStep() {
    this.generatePieChart(this.parentAccountBalances.pop());
  }

}

