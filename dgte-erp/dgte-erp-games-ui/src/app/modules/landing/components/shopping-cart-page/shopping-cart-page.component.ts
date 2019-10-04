import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '@games/core/services';

@Component({
  selector: 'games-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public shoppingCart;
  private shoppingCartSub;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.shoppingCartSub = this.shoppingCartService.shoppingCart.subscribe(shoppingCart => {
      this.shoppingCart = shoppingCart;
    });
  }

  ngOnDestroy() {
    this.shoppingCartSub.unsubscribe();
  }

}
