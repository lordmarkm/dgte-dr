import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationModalComponent } from '../../components/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService {
  constructor(private modalService: NgbModal) { }

  public confirm(message = 'Are you sure you want to proceed?') {
    // const component = new ModalComponent();
    // component.message = label;
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.message = message;

    return modalRef;
  }
}
