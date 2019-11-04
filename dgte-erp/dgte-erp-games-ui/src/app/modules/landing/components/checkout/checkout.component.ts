import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService, GamerService } from '@games/shared/services';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from '@games/shared/services';
import { ShoppingCart } from '@games/shared/models';
import { AddOrUpdateAddressComponent } from '@games/shared/components/address/modal-add-or-update-address.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal,
    private shoppingCartService: ShoppingCartService,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private gamerService: GamerService) { }

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
    this.gamerService.getDeliveryAddresses().subscribe(addresses => {
      this.addresses = addresses;
      this.address = addresses[0];
    });
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
    return false;
  }

  private handleAddedAddress(address: any) {
    if (address) {
      this.gamerService.addAddress(address).subscribe(a => a);
      this.addresses.push(address);
      this.address = address;
    }
  }

}
