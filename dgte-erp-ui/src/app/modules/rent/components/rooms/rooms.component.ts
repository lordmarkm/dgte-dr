import { Component, OnInit, TemplateRef, OnDestroy, ViewChild } from '@angular/core';

import { Subject, interval, Subscription, combineLatest } from 'rxjs';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { ConfirmationModalService, ProjectService, ProfitAndLossService } from '@los/core/services';
import { ApartmentService } from '@rent/services';
import { RoomSearch } from '@rent/models';
import { API_DATE_FORMAT } from '@los/shared/constants';
import * as _ from 'lodash'

@Component({
  selector: 'dgte-erp-rent-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public error: string;
  private projectServiceSub;
  private project;
  public rooms;
  public searchQuery: RoomSearch = new RoomSearch();

  constructor(private modalService: NgbModal,
              private confirmationModalService: ConfirmationModalService,
              private projectService: ProjectService,
              private apartmentService: ApartmentService) { }

  ngOnInit() {
    this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
      if (!proj.code) {
          return;
      }
      this.project = proj;
      this.loadRooms(proj);
    });
  }

  ngOnDestroy() {
      this.projectServiceSub.unsubscribe();
  }

  private loadRooms(proj) {
    delete this.error;
    this.apartmentService.findRoomsByProjectCode(proj.code).subscribe(roomsPage => {
        this.rooms = roomsPage.content;
        this.searchQuery.totalElements = roomsPage.totalElements;
        this.isLoading = false;
    },
    err => {
        this.isLoading = false;
        switch (err.status) {
          case 400:
            this.error = 'Error! No rooms found.';
            break;
          default:
            this.error = 'An unexpected error has occurred! ' + err.error.message;
        }
    });
  }

}
