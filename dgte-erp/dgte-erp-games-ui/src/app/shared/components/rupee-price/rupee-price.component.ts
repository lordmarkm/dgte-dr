import { Component, Input } from '@angular/core';

@Component({
  selector: 'rupee-price',
  templateUrl: './rupee-price.component.html',
  styleUrls: ['./rupee-price.component.scss']
})
export class RupeePriceComponent {
  @Input() price: number = 0;

  constructor() {}

  ngOnInit() {}

}
