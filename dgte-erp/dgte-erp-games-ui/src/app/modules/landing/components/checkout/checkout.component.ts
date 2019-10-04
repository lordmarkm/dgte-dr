import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '@games/core/services';

@Component({
  selector: 'games-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
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
