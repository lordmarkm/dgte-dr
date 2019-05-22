import { Component, Input, OnInit} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService, LoansService, StoreService } from '@los/core/services';
import { AdminUserInfo } from '@los/shared/models';

@Component({
  selector: 'los-add-note-modal',
  templateUrl: './add-note-modal.component.html',
  styleUrls: ['./add-note-modal.component.scss']
})
export class AddNoteModalComponent implements OnInit {
  @Input() loanDetails;

  public comment = '';
  public hasError = false;
  public isSubmitting = false;
  public userName = '';
  public role = 'AO';

  public userInfo: AdminUserInfo;

  constructor(public activeModal: NgbActiveModal,
              private confirmationModalService: ConfirmationModalService,
              private loanService: LoansService,
              private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.get('adminUserInfo').subscribe(userInfo => {
      if (userInfo) {
        this.userName = userInfo.username;
      }
    });
  }

  addNote() {
    if (this.comment === '') {
      this.hasError = true;
    } else {
      this.confirmationModalService.confirm().result.then((result) => {
        if (result === 'confirm') {
          this.isSubmitting = true;
            let noteBody = {
              updatedBy: this.userName,
              status : this.loanDetails.status,
              message : this.comment,
              role : this.role
            };
            this.loanService.addNote(this.loanDetails.id, noteBody)
              .subscribe(resp => {
                this.isSubmitting = false;
                this.activeModal.close({
                  refNo: this.loanDetails.loanReferenceNumber,
                  status: this.loanDetails.status,
                });
              }, err => {
                this.isSubmitting = false;
              });
        }
      }, (reason) => { });
    }
  }
}
