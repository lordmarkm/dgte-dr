import { Component, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartService } from '@games/shared/services';
import { AuthService } from '@games/shared/services';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'modal-add-or-update-address',
  templateUrl: './modal-add-or-update-address.component.html',
  styleUrls: ['./modal-add-or-update-address.component.scss']
})
export class AddOrUpdateAddressComponent {
  @Input() address: any;

  constructor(public activeModal: NgbActiveModal) {}

  public save() {
    this.activeModal.close(this.address);
  }

}
