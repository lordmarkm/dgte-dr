import { Component, Input } from '@angular/core';

@Component({
  selector: 'peso-amount',
  templateUrl: './peso-amount.component.html',
  styleUrls: ['./peso-amount.component.scss']
})
export class PesoAmountComponent {
  @Input() amount: number = 0;
  @Input() title: string;

  constructor() {}

}
