import { Component, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '@games/shared/models';
import { OrderService } from '@games/shared/services';

@Component({
  selector: 'modal-confirm-order',
  templateUrl: './modal-confirm-order.component.html',
  styleUrls: ['./modal-confirm-order.component.scss']
})
export class ConfirmOrderComponent {
  @Input() order: Order;
  public loading: boolean = false;
  public error: string;

  constructor(public activeModal: NgbActiveModal, private orderService: OrderService) {}

  public proceed() {
    this.loading = true;
    delete this.error;
    this.orderService.placeOrder(this.order).subscribe(placeOrderResult => {
      this.activeModal.close(placeOrderResult);
    },
    err => {
      if (err.error && err.error.message) {
        this.error = err.error.message;
      } else {
        this.error = err.message;
      }
      this.loading = false;
    });
  }

}
