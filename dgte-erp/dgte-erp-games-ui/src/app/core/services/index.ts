export * from './game.service';
export * from './auth.service';

import { GameService } from './game.service';
import { AuthService } from './auth.service';

export const ApiServices = [
  GameService,
  AuthService
]
