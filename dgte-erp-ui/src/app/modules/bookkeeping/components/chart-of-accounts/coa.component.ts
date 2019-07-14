import { Component, OnInit, TemplateRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { Subject, interval, Subscription, combineLatest } from 'rxjs';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { ConfirmationModalService,AccountService, ProjectService } from '@los/core/services';
import { LoanSearch, Company, AdminUserInfo, Account } from '@los/shared/models';
import { API_DATE_FORMAT } from '@los/shared/constants';
import { CreateAccountModalComponent } from '../create-account-modal/create-account-modal.component';
import { treeConfig } from './coa.tree-config';
import * as _ from 'lodash'
import { Router } from '@angular/router';

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
              private confirmationModalService: ConfirmationModalService,
              private projectService: ProjectService,
              private accountService: AccountService,
              private _router: Router) { }

  ngOnInit() {
      this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
          if (!proj.code) {
              return;
          }

          //Append the project code to URL
        this._router.navigate([], {
          queryParams: {
            projectCode: proj.code
          },
          queryParamsHandling: 'merge'
        });

          this.isLoading = true;
          this.project = proj;
          delete this.error;
          this.accountService.findRootByProjectCode(proj.code).subscribe((parentAccount: Account) => {
              if (parentAccount) {
                this.nodes = [parentAccount];
                if (this.tree) {
                  this.tree.treeModel.update();
                  setTimeout(() => {
                    console.log('A futile attempt to expand the tree');
                    this.tree.treeModel.expandAll();
                  }, 200);
                }
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
          });
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.tree) {
        this.tree.treeModel.expandAll();
      }
    }, 200);
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
    if (!newAccount) {
        return;
    }
    if (!parentAccount.children) {
      parentAccount.children = [];
    }
    parentAccount.children.push(newAccount);
    parentAccount.hasChildren = true;
    this.tree.treeModel.update();
    //this.tree.treeModel.expandAll();
  }

  deleteAccount(node) {
      delete this.error;
      this.confirmationModalService.confirm().result.then((result) => {
          if (result === 'confirm') {
            this.isLoading = true;
              this.accountService.delete(node.data.code)
                .subscribe(resp => {
                    let parentNode = node.realParent ? node.realParent : node.treeModel.virtualRoot;
                    _.remove(parentNode.data.children, (child) => {
                        return child === node.data;
                    });
                    if (node.parent.data.children.length === 0) {
                        node.parent.data.hasChildren = false;
                    }
                    this.tree.treeModel.update();
                    this.isLoading = false;
                },
                err => {
                    switch (err.status) {
                    case 409:
                        this.error = 'You can\'t delete this account because there are transactions that involve it. Delete those transactions first, then try again.';
                        break;
                    }
                    this.isLoading = false;
                });
          }
        });
  }

}
