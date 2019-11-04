import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartService } from '@games/shared/services';

@Component({
  selector: 'shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {
  @Input() item: any;
  @Input() mode: string;
  @Input() index: number;
  public imgUrl: string;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.imgUrl = this.item.game.imageUrl.replace(/\.([^.]+)$/, 's.$1');
  }

  public removeItem() {
    this.shoppingCartService.removeItem(this.index, this.mode);
  }

}
