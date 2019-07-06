import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'los-position-input',
  templateUrl: './position-input.component.html',
  styleUrls: ['./position-input.component.scss']
})
export class PositionInputComponent implements OnInit {
  @Input() control: FormControl;

  public positions: object[];

  constructor() {
    this.positions = [
      {
        label: 'Rank and File',
        value: 'RANK_AND_FILE'
      },
      {
        label: 'Officer',
        value: 'OFFICER'
      }
    ];
  }

  ngOnInit() {
  }

}
