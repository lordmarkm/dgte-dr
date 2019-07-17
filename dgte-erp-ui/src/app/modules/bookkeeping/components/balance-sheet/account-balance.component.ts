import { Component, Input } from '@angular/core';

@Component({
  selector: 'dgte-erp-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class AccountBalanceComponent {
  @Input() accountBalance: any;
  @Input() level: number;
  @Input() onlyChild: boolean;

  constructor() { }

}
