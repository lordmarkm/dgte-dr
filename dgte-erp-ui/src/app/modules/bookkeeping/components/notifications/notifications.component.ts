import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { ProjectService, NotificationsService } from '@los/core/services';

@Component({
  selector: 'dgte-erp-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public error: string = '';
  public notifications;

  private projectServiceSub;

  constructor(private modalService: NgbModal,
              private projectService: ProjectService,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.projectServiceSub = this.projectService.selectedProject.subscribe(proj => {
        this.isLoading = true;
        this.notificationsService.findByProjectCode(proj.code).subscribe(notifs => {
          this.notifications = notifs;
          this.isLoading = false;
          this.error = '';
        },
        err => {
          delete this.notifications;
          this.isLoading = false;
          switch (err.status) {
          case 400:
            this.error = 'This project\'s notification settings could not be retrieved';
            break;
          default:
            this.error = err.message;
          }
        });
    });
  }

  ngOnDestroy() {
    this.projectServiceSub.unsubscribe();
  }

}
