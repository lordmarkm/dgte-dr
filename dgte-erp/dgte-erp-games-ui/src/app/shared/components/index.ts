import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { SectionTitleComponent } from './layout/section-title/section-title.component';
import { LoadingWrapperComponent } from './loading-wrapper/loading-wrapper.component';
import { RupeePriceComponent } from './rupee-price/rupee-price.component';
import { PesoAmountComponent } from './peso-amount/peso-amount.component';
import { RupeeAmountComponent } from './rupee-amount/rupee-amount.component';
import { BuyableGameComponent } from './buyable-game/buyable-game.component';
import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';

//modals
import { AddToCartComponent } from './modal-add-to-cart/modal-add-to-cart.component';
import { AddOrUpdateAddressComponent } from './address/modal-add-or-update-address.component';

export const Components = [
  HeaderComponent,
  FooterComponent,
  SectionTitleComponent,
  LoadingWrapperComponent,
  RupeePriceComponent,
  PesoAmountComponent,
  RupeeAmountComponent,
  BuyableGameComponent,
  ShoppingCartItemComponent,

  //modals
  AddToCartComponent,
  AddOrUpdateAddressComponent
];

export const EntryComponents = [
  AddToCartComponent,
  AddOrUpdateAddressComponent
];

export {
  HeaderComponent,
  FooterComponent,
  SectionTitleComponent,
  LoadingWrapperComponent,
  RupeePriceComponent,
  PesoAmountComponent,
  RupeeAmountComponent,
  BuyableGameComponent,
  AddToCartComponent,
  ShoppingCartItemComponent
};
