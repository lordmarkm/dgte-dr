import { Component, Input } from '@angular/core';


@Component({
  selector: 'erp-account-name',
  templateUrl: './erp-account-name.component.html',
  styleUrls: ['./erp-account-name.component.scss']
})
export class ErpAccountNameComponent {
  @Input() account;

  constructor() {}

}
