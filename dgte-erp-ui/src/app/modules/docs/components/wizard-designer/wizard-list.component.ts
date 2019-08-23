import { Component, OnInit, TemplateRef, OnDestroy, ViewChild } from '@angular/core';

import { Subject, interval, Subscription, combineLatest } from 'rxjs';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { ConfirmationModalService, AccountService, ProjectService } from '@los/core/services';
import { API_DATE_FORMAT } from '@los/shared/constants';
import * as _ from 'lodash';
import { GenericSearch } from '@los/shared/models';

@Component({
  selector: 'dgte-erp-docs-wizard-list',
  templateUrl: './wizard-list.component.html',
  styleUrls: ['./wizard-list.component.scss']
})
export class WizardListComponent implements OnInit, OnDestroy {
  public searchQuery: GenericSearch = new GenericSearch();
  public isLoading: boolean = false;
  public error: string;
  private projectServiceSub;
  private project;

  constructor(private modalService: NgbModal,
              private confirmationModalService: ConfirmationModalService,
              private projectService: ProjectService,
              private accountService: AccountService) { }

  ngOnInit() {
    this.searchQuery.sort = 'createdDate,desc';
    this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
      if (!proj.code) {
          return;
      }
      this.project = proj;
      this.getWizards();
    });
  }

  ngOnDestroy() {
      this.projectServiceSub.unsubscribe();
  }

  getWizards() {
    this.isLoading = true;
    let wizardSearch = {
        sort: this.searchQuery.sort,
        size: 5,
        page: this.searchQuery.page,
        projectCode: this.project.code
    };

    this.wizardService.search(wizardSearch)
      .subscribe(page => {
        this.isLoading = false;
        this.wizards = page.content;
        this.searchQuery.totalElements = page.totalElements;
      }, err => {
        this.isLoading = false;
      });
  }
}
