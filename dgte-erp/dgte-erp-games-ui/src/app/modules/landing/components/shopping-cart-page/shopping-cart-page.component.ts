import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '@games/shared/services';
import { AuthService } from '@games/shared/services';
import { AngularFireAuth } from "@angular/fire/auth";
import { ShoppingCart } from '@games/shared/models';
import swal from 'sweetalert2';

@Component({
  selector: 'games-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public shoppingCart: ShoppingCart;
  private shoppingCartSub;
  private authStateSub;
  public auth;

  constructor(private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.authStateSub = this.afAuth.authState.subscribe(auth => {
      this.auth = auth;
    });
    this.shoppingCartSub = this.shoppingCartService.shoppingCart.subscribe(shoppingCart => {
      this.shoppingCart = shoppingCart;
    });
  }

  ngOnDestroy() {
    this.shoppingCartSub.unsubscribe();
    this.authStateSub.unsubscribe();
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
          showConfirmButton: true
        });
      }
    });
  }

  onCurrencyChange(item) {
    this.shoppingCartService.onCurrencyChange(item);
  }

}
