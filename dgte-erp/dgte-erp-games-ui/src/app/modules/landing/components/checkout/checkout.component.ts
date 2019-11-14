import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService, GamerService } from '@games/shared/services';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from '@games/shared/services';
import { ShoppingCart, Order } from '@games/shared/models';
import { AddOrUpdateAddressComponent } from '@games/shared/components/address/modal-add-or-update-address.component';
import { ConfirmOrderComponent } from './modal-confirm-order.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

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
  public address: any;
  public addresses: any = [];
  public addressesLoaded: boolean = false;

  constructor(private modalService: NgbModal,
    private shoppingCartService: ShoppingCartService,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private gamerService: GamerService,
    private router: Router) { }

  ngOnInit() {
    this.shoppingCartSub = this.shoppingCartService.shoppingCart.subscribe(shoppingCart => {
      this.shoppingCart = shoppingCart;
    });
    this.authStateSub = this.afAuth.authState.subscribe(auth => {
        if (auth) {
            this.displayName = auth['displayName'];
            this.displayImage = auth['photoURL'];
            this.getDeliveryAddresses();
        } else {
            delete this.displayName;
            delete this.displayImage;
        }
    });
  }

  private getDeliveryAddresses() {
    //TODO retryWhen here
    //this can return empty on page refresh in checkout page
    this.gamerService.getDeliveryAddresses().subscribe(
      addresses => {
        this.addresses = addresses;
        this.address = addresses[0];
        this.addressesLoaded = true;
      },
      err => {
        console.log(err);
        this.addressesLoaded = true;
      }
    );
  }

  ngOnDestroy() {
    this.shoppingCartSub.unsubscribe();
    this.authStateSub.unsubscribe();
  }

  public firebaseLogin() {
      this.authService.FacebookAuth();
  }

  addShippingAddress() {
    const modalRef = this.modalService.open(AddOrUpdateAddressComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.address = {};
    modalRef.result.then(address => this.handleAddedAddress(address));
  }

  private handleAddedAddress(address: any) {
    if (address) {
      this.gamerService.addAddress(address).subscribe(a => a);
      this.addresses.push(address);
      this.address = address;
    }
  }

  placeOrder() {
    const modalRef = this.modalService.open(ConfirmOrderComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    var order: Order = new Order(this.shoppingCart);
    order.buyDeliveryAddress = this.address;
    modalRef.componentInstance.order = order;
    modalRef.result.then(placeOrderResult => this.handlePlaceOrderResult(placeOrderResult));
  }

  handlePlaceOrderResult(placeOrderResult) {
    if (placeOrderResult) {
      console.log(placeOrderResult);
      swal({
        title: "Order Placed",
        text: 'Order placement success. Please wait for us to contact you with confirmation.',
        type: 'success',
        showConfirmButton: true
      }).then(confirmResult => {
        if (confirmResult.value) {
          this.shoppingCartService.empty();
          this.router.navigate(['/user-profile']);
        }
      });
    }
  }

}
