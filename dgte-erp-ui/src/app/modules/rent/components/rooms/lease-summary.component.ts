import { Component, OnInit, Input } from '@angular/core';

const moment = require('moment');

import { LeaseService } from '@rent/services';

@Component({
  selector: 'dgte-erp-rent-lease-summary',
  templateUrl: './lease-summary.component.html',
  styleUrls: []
})
export class LeaseSummaryComponent implements OnInit {
  public isLoading: boolean = false;
  @Input() roomCode: string;
  @Input() public lease;
  @Input() public available: boolean;
  public readableDueDate: string;
  public error;

  constructor(private leaseService: LeaseService) { }

  ngOnInit() {
    if (!this.lease && !this.available) {
      this.isLoading = true;
      this.leaseService.findActiveLeaseByRoomCode(this.roomCode).subscribe(lease => {
        this.lease = lease;
        this.readableDueDate = moment(lease.nextDueDate).fromNow();
        this.isLoading = false;
      }, e => {
        if (e.status === 404) {
          this.available = true;
        } else {
          this.error = e.message;
        }
        this.isLoading = false;
      });
    }
  }

}
