import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'los-duration-display',
  templateUrl: './duration-display.component.html',
  styleUrls: ['./duration-display.component.scss']
})
export class DurationDisplayComponent implements OnInit {
  @Input() public readonly = false;
  @Input() public errorMessage;
  @Input() public formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  // Create a new array with set limit
  public range(count): Array<number> {
    return new Array(count);
  }

  get years() { return this.formGroup.get('years'); }
  get months() { return this.formGroup.get('months'); }
}
