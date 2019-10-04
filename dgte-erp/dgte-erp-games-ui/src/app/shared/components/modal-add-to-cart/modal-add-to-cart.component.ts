import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartService } from '@games/core/services';

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
    console.log('bgImgUrl=' + this.backgroundImageUrl);

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

  public addToCart() {
    this.shoppingCart.addItem(this.orderItem, this.mode);
    this.activeModal.close();
  }

}
