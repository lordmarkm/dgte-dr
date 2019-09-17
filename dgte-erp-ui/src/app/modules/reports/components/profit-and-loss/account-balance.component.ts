import { Component, Input } from '@angular/core';

@Component({
  selector: 'dgte-erp-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./profit-and-loss.component.scss']
})
export class AccountBalanceComponent {
  @Input() accountBalance: any;
  @Input() level: number;
  @Input() onlyChild: boolean;

  constructor() { }

}
