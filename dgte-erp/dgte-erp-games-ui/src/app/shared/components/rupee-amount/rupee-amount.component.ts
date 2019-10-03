import { Component, Input } from '@angular/core';

@Component({
  selector: 'rupee-amount',
  templateUrl: './rupee-amount.component.html',
  styleUrls: ['./rupee-amount.component.scss']
})
export class RupeeAmountComponent {
  @Input() amount: number = 0;
  @Input() title: string;

  constructor() {}

}
