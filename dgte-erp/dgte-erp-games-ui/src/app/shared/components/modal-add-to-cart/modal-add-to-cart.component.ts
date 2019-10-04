import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-add-to-cart',
  templateUrl: './modal-add-to-cart.component.html',
  styleUrls: ['./modal-add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input() game: any;
  @Input() mode: string;
  public orderItem: any = {
    game: this.game
  }

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    switch (this.mode) {
      case 'BUY':
        this.orderItem.buyPrice = this.game.buyPrice;
        break;
      case 'SELL':
        this.orderItem.sellprice = this.game.sellPrice;
        break;
      case 'RENT':
        this.orderItem.deposit = this.game.depositRupees;
        break;
      default:
        console.error('Unknown sell mode: ' + this.mode);
    }
  }
  public addToCart() {
    
  }

}
