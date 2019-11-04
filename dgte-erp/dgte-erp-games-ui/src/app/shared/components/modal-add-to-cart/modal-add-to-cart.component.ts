import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartService } from '@games/shared/services';
import { AuthService } from '@games/shared/services';
import { AngularFireAuth } from "@angular/fire/auth";
import { OrderItem } from '@games/shared/models';
import swal from 'sweetalert2';

@Component({
  selector: 'modal-add-to-cart',
  templateUrl: './modal-add-to-cart.component.html',
  styleUrls: ['./modal-add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit, OnDestroy {
  @Input() game: any;
  @Input() mode: string;
  public orderItem: OrderItem;
  public backgroundImageUrl: string;
  private authStateSub;
  public auth;

  constructor(public activeModal: NgbActiveModal,
    private shoppingCart: ShoppingCartService,
    private authService: AuthService,
    public afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.authStateSub = this.afAuth.authState.subscribe(auth => {
      this.auth = auth;
    });

    this.orderItem = new OrderItem(this.game, 'CASH');

    this.backgroundImageUrl = this.game.imageUrl.replace(/\.([^.]+)$/, 'h.$1');
    switch (this.mode) {
      case 'BUY':
        this.orderItem.buyPrice = this.game.sellPrice;
        break;
      case 'SELL':
        this.orderItem.sellPrice = this.game.buylistPrice;
        break;
      case 'RENT':
        this.orderItem.depositRupees = this.game.depositRupees;
        break;
      default:
        console.error('Unknown sell mode: ' + this.mode);
    }
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }

  public firebaseLogin() {
      this.authService.FacebookAuth();
  }

  public onCurrencyChange() {
    switch(this.orderItem.currency) {
      case 'CASH':
        this.orderItem.buyPrice = this.game.sellPrice;
        break;
      case 'RUPEES':
        this.orderItem.buyPrice = this.game.sellRupees;
        break;
      default:
        alert('Unhandled currency: ' + this.orderItem.currency);
    }
  }

  public addToCart() {
    this.shoppingCart.addItem(this.orderItem, this.mode);
    swal({
      title: "Success",
      text: this.game.name + " has been added to your shopping cart",
      type: 'success',
      showConfirmButton: true
    });
    this.activeModal.close(this.orderItem);
  }

}
