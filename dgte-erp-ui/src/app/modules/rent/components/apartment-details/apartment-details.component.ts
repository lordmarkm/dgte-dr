import { Component, OnInit, TemplateRef, OnDestroy, ViewChild } from '@angular/core';

import { Subject, interval, Subscription, combineLatest } from 'rxjs';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { ConfirmationModalService, ProjectService, ProfitAndLossService } from '@los/core/services';
import { ApartmentService } from '@rent/services';
import { API_DATE_FORMAT } from '@los/shared/constants';
import * as _ from 'lodash'

@Component({
  selector: 'dgte-erp-rent-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.scss']
})
export class ApartmentDetailsComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public error: string;
  private projectServiceSub;
  private project;
  public apartment;

  constructor(private modalService: NgbModal,
              private confirmationModalService: ConfirmationModalService,
              private projectService: ProjectService,
              private apartmentService: ApartmentService) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
      if (!proj.code) {
          return;
      }
      this.project = proj;
      this.loadApartment(proj);
    });
  }

  ngOnDestroy() {
      this.projectServiceSub.unsubscribe();
  }

  loadApartment(proj) {
    this.isLoading = true;
    delete this.error;
    delete this.apartment;
    this.apartmentService.findByProjectCode(proj.code).subscribe(apartmentPage => {
        if (apartmentPage.content.length) {
          this.apartment = apartmentPage.content[0];
        } else {
          this.error = 'There is no rental property associated with this project';
        }
        this.isLoading = false;
    },
    err => {
        this.isLoading = false;
        switch (err.status) {
          case 400:
            this.error = 'Error! No apartment found.';
            break;
          default:
            this.error = 'An unexpected error has occurred! ' + err.error.message;
        }
    });
  }

}
