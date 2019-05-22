import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'los-form-input-error',
  templateUrl: './form-input-error.component.html',
  styleUrls: ['./form-input-error.component.scss']
})
export class FormInputErrorComponent implements OnInit {
  @Input() public message: string;
  @Input() public showMessage: boolean;

  constructor() { }

  ngOnInit() {
  }

}
