import { Component, Input } from '@angular/core';

@Component({
  selector: 'dgte-erp-comparative-account-balance',
  templateUrl: './comparative-account-balance.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class ComparativeAccountBalanceComponent {
  @Input() comparativeAccountBalance: any;
  @Input() level: number;
  @Input() onlyChild: boolean;

  constructor() { }

}
