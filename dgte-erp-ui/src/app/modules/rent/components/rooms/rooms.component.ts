import { Component, OnInit, TemplateRef, OnDestroy, ViewChild } from '@angular/core';

import { Subject, interval, Subscription, combineLatest } from 'rxjs';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { ConfirmationModalService, ProjectService } from '@los/core/services';
import { AddRoomModalComponent } from '@rent/components/add-room-modal/add-room-modal.component';
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
  public apartment;
  public rooms;
  public searchQuery: RoomSearch = new RoomSearch();

  constructor(private modalService: NgbModal,
              private confirmationModalService: ConfirmationModalService,
              private projectService: ProjectService,
              private apartmentService: ApartmentService) { }

  ngOnInit() {
    this.searchQuery.sort = 'name,asc';
    this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
      if (!proj.code) {
          return;
      }
      this.apartmentService.findByProjectCode(proj.code).subscribe(aptPage => {
        if (aptPage.content && aptPage.content.length) {
          this.apartment = aptPage.content[0];
        }
      });
      this.project = proj;
      this.loadRooms();
    });
  }

  ngOnDestroy() {
      this.projectServiceSub.unsubscribe();
  }

  private loadRooms() {
    delete this.error;
    let roomSearch = {
        sort: this.searchQuery.sort,
        size: 5,
        page: this.searchQuery.page,
        projectCode: this.project.code
    };
    this.apartmentService.findRoomsByProjectCode(roomSearch).subscribe(roomsPage => {
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

  public onSort(event): void {
    const column: string = event.column.prop;
    this.searchQuery.sort = `${column},${event.newValue}`;
    this.loadRooms();
  }

  public setPage(pageInfo) {
    const page = pageInfo.page - 1;
    this.searchQuery.setPageNumber(page);
    this.loadRooms();
  }

  //Add room
  public addRoom() {
      if (!this.project) {
        console.error('No project selected!');
        return;
      }
      const modalRef = this.modalService.open(AddRoomModalComponent, { size: 'md', backdrop: 'static', keyboard: false });
      modalRef.componentInstance.apartment = this.apartment;
      modalRef.result.then(room => this.handleAddRoomResponse(room));
  }

  private handleAddRoomResponse(room) {
    this.loadRooms();
  }

}
