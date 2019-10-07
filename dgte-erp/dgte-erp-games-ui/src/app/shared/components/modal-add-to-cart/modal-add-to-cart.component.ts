import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartService } from '@games/core/services';
import swal from 'sweetalert2';

@Component({
  selector: 'modal-add-to-cart',
  templateUrl: './modal-add-to-cart.component.html',
  styleUrls: ['./modal-add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input() game: any;
  @Input() mode: string;
  public orderItem: any;
  public backgroundImageUrl: string;

  constructor(public activeModal: NgbActiveModal,
    private shoppingCart: ShoppingCartService) {}

  ngOnInit() {
    this.orderItem = {
      game: this.game
    };

    this.backgroundImageUrl = this.game.imageUrl.replace(/\.([^.]+)$/, 'h.$1');
    switch (this.mode) {
      case 'BUY':
        this.orderItem.buyPrice = this.game.sellPrice;
        break;
      case 'SELL':
        this.orderItem.sellprice = this.game.buylistPrice;
        break;
      case 'RENT':
        this.orderItem.deposit = this.game.depositRupees;
        break;
      default:
        console.error('Unknown sell mode: ' + this.mode);
    }
  }

  public async addToCart() {
    this.shoppingCart.addItem(this.orderItem, this.mode);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true     
    })
    .then((willDelete) => {

        if(willDelete.value){
             swal("Success");
        }else{
          swal("Fail");
        }

      console.log(willDelete)
    });
    this.activeModal.close(this.orderItem);
  }

}
