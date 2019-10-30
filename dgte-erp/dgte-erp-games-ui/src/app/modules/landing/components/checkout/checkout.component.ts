import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '@games/core/services';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from '@games/core/services';
import { ShoppingCart } from '@games/shared/models';

@Component({
  selector: 'games-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public shoppingCart: ShoppingCart;
  private shoppingCartSub;
  public displayName: string;
  public displayImage: string;
  private authStateSub;

  constructor(private shoppingCartService: ShoppingCartService,
    private afAuth: AngularFireAuth,
    private authService: AuthService) { }

  ngOnInit() {
    this.shoppingCartSub = this.shoppingCartService.shoppingCart.subscribe(shoppingCart => {
      this.shoppingCart = shoppingCart;
    });
    this.authStateSub = this.afAuth.authState.subscribe(auth => {
        if (auth) {
            this.displayName = auth['displayName'];
            this.displayImage = auth['photoURL'];
        } else {
            delete this.displayName;
            delete this.displayImage;
        }
    });
  }

  ngOnDestroy() {
    this.shoppingCartSub.unsubscribe();
    this.authStateSub.unsubscribe();
  }

  public firebaseLogin() {
      this.authService.FacebookAuth();
  }
}
