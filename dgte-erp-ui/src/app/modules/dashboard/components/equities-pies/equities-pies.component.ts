import { Component, OnInit, TemplateRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { Subject, interval, Subscription, combineLatest } from 'rxjs';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { ConfirmationModalService, AccountService, ProjectService } from '@los/core/services';
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
  public title = 'Browser market shares at a specific website, 2014';
  public type='PieChart';
  public data = [
   ['Firefox', 45.0],
   ['IE', 26.8],
   ['Chrome', 12.8],
   ['Safari', 8.5],
   ['Opera', 6.2],
   ['Others', 0.7] 
];
  public columnNames = ['Browser', 'Percentage'];
  public options = {
   colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], is3D: true
};
  public width = 500;
  public height = 500;

  constructor(private modalService: NgbModal,
              private confirmationModalService: ConfirmationModalService,
              private projectService: ProjectService,
              private accountService: AccountService) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
      if (!proj.code) {
          return;
      }
      this.project = proj;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
      this.projectServiceSub.unsubscribe();
  }

}
