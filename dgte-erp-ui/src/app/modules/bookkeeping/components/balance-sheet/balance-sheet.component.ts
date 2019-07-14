import { Component, OnInit, OnDestroy } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { ConfirmationModalService, AccountService, ProjectService } from '@los/core/services';
import { Account } from '@los/shared/models';
import * as _ from 'lodash'

@Component({
  selector: 'dgte-erp-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class BalanceSheetComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public error: string;
  private projectServiceSub;
  private project;

  constructor(private modalService: NgbModal,
              private confirmationModalService: ConfirmationModalService,
              private projectService: ProjectService,
              private accountService: AccountService) { }

  ngOnInit() {
      this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
          if (!proj.code) {
              return;
          }
          this.isLoading = true;
          this.project = proj;
          delete this.error;
          this.accountService.findRootByProjectCode(proj.code).subscribe((parentAccount: Account) => {
              this.isLoading = false;
          },
          err => {
              this.isLoading = false;
              switch (err.status) {
                case 400:
                  this.error = 'Error! Parent account could not be found.';
                  break;
                default:
                  this.error = 'An unexpected error has occurred! ' + err.error.message;
              }
          });
      });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
      this.projectServiceSub.unsubscribe();
  }

}
