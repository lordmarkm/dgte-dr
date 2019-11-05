export * from './game.service';
export * from './gamer.service';
export * from './auth.service';
export * from './shopping-cart.service';
export * from './order.service';

import { GameService } from './game.service';
import { GamerService } from './gamer.service';
import { AuthService } from './auth.service';
import { ShoppingCartService } from './shopping-cart.service';
import { OrderService } from './order.service';

export const Services = [
  GameService,
  GamerService,
  AuthService,
  ShoppingCartService,
  OrderService
]
