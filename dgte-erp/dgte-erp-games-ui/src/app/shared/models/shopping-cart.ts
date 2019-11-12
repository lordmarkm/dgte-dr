import { Game } from './game';

export class ShoppingCart {
  buyItems: OrderItem[] = [];
  sellItems: OrderItem[] = [];
  rentItems: OrderItem[] = [];
  itemCount: number = 0;
  totalAmount: number = 0;
  totalRupees: number = 0;
}

export class OrderItem {
  game: Game;
  currency: string = 'CASH';
  buyPrice: number = 0;
  buyRupees: number = 0;
  sellPrice: number = 0;
  sellRupees: number = 0;
  depositRupees: number = 0;

  constructor(game: Game, currency: string) {
    this.game = game;
    this.currency = currency;
  }
}