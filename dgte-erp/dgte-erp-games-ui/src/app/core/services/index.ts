export * from './game.service';
export * from './gamer.service';
export * from './auth.service';

import { GameService } from './game.service';
import { GamerService } from './gamer.service';
import { AuthService } from './auth.service';

export const ApiServices = [
  GameService,
  GamerService,
  AuthService
]
