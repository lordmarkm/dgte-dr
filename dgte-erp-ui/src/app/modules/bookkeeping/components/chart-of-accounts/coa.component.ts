import { Component, OnInit, TemplateRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { Subject, interval, Subscription, combineLatest } from 'rxjs';
import { flatMap, takeUntil } from 'rxjs/operators';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { AccountService, ProjectService } from '@los/core/services';
import { LoanSearch, Company, AdminUserInfo } from '@los/shared/models';
import { API_DATE_FORMAT } from '@los/shared/constants';
import { CreateAccountModalComponent } from '../create-account-modal/create-account-modal.component';
import { treeConfig } from './coa.tree-config';

@Component({
  selector: 'dgte-erp-coa',
  templateUrl: './coa.component.html',
  styleUrls: ['./coa.component.scss']
})
export class CoaComponent implements OnInit, AfterViewInit, OnDestroy {
  public isLoading: boolean = false;
  public error: string;
  private projectServiceSub;
  private project;

  //treemap
  public nodes = [];
  public options = treeConfig;
  @ViewChild('tree') tree;

  constructor(private modalService: NgbModal,
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
          this.accountService.findRootByProjectCode(proj.code).subscribe(parentAccount => {
              this.nodes = parentAccount.children;
              if (this.tree) {
                this.tree.treeModel.update();
              }
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
          })
      });
  }

  ngAfterViewInit() {
    if (this.tree) {
      this.tree.treeModel.expandAll();
    }
  }

  ngOnDestroy() {
      this.projectServiceSub.unsubscribe();
  }

  onTreeInitialized(treeComponent, $event) {
    treeComponent.treeModel.expandAll();
  }

  addChild(account) {
    const modalRef = this.modalService.open(CreateAccountModalComponent, { backdrop: 'static', keyboard: false });
    modalRef.componentInstance.parentAccount = account;
    modalRef.componentInstance.project = this.project;
    modalRef.result.then(newAccount => this.handleCreateAccountResponse(account, newAccount));
  }

  handleCreateAccountResponse(parentAccount, newAccount) {
    parentAccount.children.push(newAccount);
    parentAccount.hasChildren = true;
    this.tree.treeModel.update();
    this.tree.treeModel.expandAll();
  }

}
