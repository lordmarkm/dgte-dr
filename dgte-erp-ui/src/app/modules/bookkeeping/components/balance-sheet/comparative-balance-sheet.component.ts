import { Component, OnInit, OnDestroy } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { ConfirmationModalService, AccountService, ProjectService, BalanceSheetService } from '@los/core/services';
import { Account } from '@los/shared/models';
import * as _ from 'lodash'
import { API_DATE_FORMAT } from '@los/shared/constants';

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
          this.isLoading = true;
          this.project = proj;
          delete this.error;
          this.balanceSheetService.findComparativeBalanceSheetByProjectCodeAndAsOfDates(proj.code, moment().format(API_DATE_FORMAT),
            moment().subtract(1, 'year').format(API_DATE_FORMAT)).subscribe(balanceSheet => {
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
      });
  }

  ngOnDestroy() {
      this.projectServiceSub.unsubscribe();
  }

}
