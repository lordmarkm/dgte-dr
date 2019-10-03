import { Component, Input } from '@angular/core';

@Component({
  selector: 'buyable-game',
  templateUrl: './buyable-game.component.html',
  styleUrls: ['./buyable-game.component.scss']
})
export class BuyableGameComponent {
  @Input() game: any;

  constructor() {}

}
