export * from './game.service';
export * from './gamer.service';
export * from './auth.service';
export * from './shopping-cart.service';

import { GameService } from './game.service';
import { GamerService } from './gamer.service';
import { AuthService } from './auth.service';
import { ShoppingCartService } from './shopping-cart.service';

export const ApiServices = [
  GameService,
  GamerService,
  AuthService,
  ShoppingCartService
]
