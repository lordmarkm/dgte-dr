import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '@games/core/services';
import swal from 'sweetalert2';

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

  clearShoppingCart() {
    swal({
      title: 'Clear Shopping Cart',
      text: 'Are you sure you want to clear your shopping cart?',
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Whoops'
    }).then(result => {
      if (result.value) {
        swal({
          title: 'Cleared!',
          text: 'Your shopping cart is cleared! Congratulations on your impulse control, baby. Proud of you.',
          type: 'success',
          showConfirmationButton: true
        });
      }
    });
  }

}
