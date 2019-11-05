import { LandingComponent } from '../landing.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmOrderComponent } from './checkout/modal-confirm-order.component';
import { ShoppingCartPageComponent } from './shopping-cart-page/shopping-cart-page.component';

export const Components = [
  LandingComponent,
  LandingPageComponent,
  CheckoutComponent,
  ConfirmOrderComponent,
  ShoppingCartPageComponent,
];

export const EntryComponents = [
  ConfirmOrderComponent
];

export {
  LandingComponent,
  LandingPageComponent,
  CheckoutComponent,
  ConfirmOrderComponent,
  ShoppingCartPageComponent,
};
