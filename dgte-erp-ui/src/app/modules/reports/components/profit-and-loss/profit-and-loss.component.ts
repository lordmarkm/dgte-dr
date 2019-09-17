import { Component, OnInit, TemplateRef, OnDestroy, ViewChild } from '@angular/core';

import { Subject, interval, Subscription, combineLatest } from 'rxjs';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { ConfirmationModalService, AccountService, ProjectService, ProfitAndLossService } from '@los/core/services';
import { API_DATE_FORMAT } from '@los/shared/constants';
import * as _ from 'lodash'

@Component({
  selector: 'dgte-erp-profit-and-loss',
  templateUrl: './profit-and-loss.component.html',
  styleUrls: ['./profit-and-loss.component.scss']
})
export class ProfitAndLossComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public error: string;
  private projectServiceSub;
  private project;

  public profitAndLoss;
  public startDate = moment().startOf('year');
  public asOfDate = moment();

  constructor(private modalService: NgbModal,
              private confirmationModalService: ConfirmationModalService,
              private projectService: ProjectService,
              private accountService: AccountService,
              private profitAndLossService: ProfitAndLossService) { }

  ngOnInit() {
    this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
      if (!proj.code) {
          return;
      }
      this.project = proj;
      this.loadProjectProfitAndLoss(proj);
    });
    this.asOfDate = moment();
  }

  ngOnDestroy() {
      this.projectServiceSub.unsubscribe();
  }

  loadProjectProfitAndLoss(proj) {
    delete this.error;
    this.profitAndLossService.findByProjectCodeAndDateRange(proj.code, this.startDate.format(API_DATE_FORMAT), moment().format(API_DATE_FORMAT), false).subscribe(profitAndLoss => {
        this.profitAndLoss = profitAndLoss;
        this.isLoading = false;
    },
    err => {
        this.isLoading = false;
        switch (err.status) {
          case 400:
            this.error = 'Error! Project profit & loss report could not be generated.';
            break;
          default:
            this.error = 'An unexpected error has occurred! ' + err.error.message;
        }
    });
  }

}
