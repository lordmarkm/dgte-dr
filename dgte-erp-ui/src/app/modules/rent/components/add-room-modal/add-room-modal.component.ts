import { Component, Input, OnInit} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService } from '@los/core/services';
import { ApartmentService } from '@rent/services';
const moment = require('moment');

@Component({
  selector: 'rent-add-room-modal',
  templateUrl: './add-room-modal.component.html',
  styleUrls: ['./add-room-modal.component.scss']
})
export class AddRoomModalComponent implements OnInit {
  @Input() public apartment;

  public modalSubtitle = 'Add Room';
  public hasError = false;
  public isLoading = false;
  public error: string;
  public room;

  constructor(public activeModal: NgbActiveModal,
              private confirmationModalService: ConfirmationModalService,
              private apartmentService: ApartmentService) {}

  ngOnInit() {
    this.room = {
      apartmentCode: this.apartment.code,
      name: '',
      priceMonthly: 0,
      available: true
    };
  }

  saveRoom() {
      this.isLoading = true;
      this.apartmentService.saveRoom(this.room).subscribe(room => {
        this.isLoading = false;
        this.activeModal.close(room);
      },
      err => {
          switch (err.status) {
            case 400:
              if (err.error) {
                this.error = err.error.error;
              }
              break;
            default:
              this.error = 'Unable to save room';
          }
          this.isLoading = false;
      });
  }

}
