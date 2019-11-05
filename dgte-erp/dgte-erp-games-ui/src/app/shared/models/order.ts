import { BaseDto } from './base-dto';
import { ShoppingCart, OrderItem } from './shopping-cart';

export class Order extends BaseDto {
  type: string = 'BUY_OR_RENT';
  buyOrderItems: OrderItem[];
  sellOrderItems: OrderItem[];
  rentOrderItems: OrderItem[];
  gamer: any;
  buyDeliveryAddress: any;
  sellDeliveryAddress: any;

  constructor(shoppingCart: ShoppingCart) {
    super();
    this.buyOrderItems = shoppingCart.buyItems;
    this.sellOrderItems = shoppingCart.sellItems;
    this.rentOrderItems = shoppingCart.rentItems;
  }

}
