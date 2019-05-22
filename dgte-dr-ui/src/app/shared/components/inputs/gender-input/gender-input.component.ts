import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from '@los/core/services';
import { AppState } from '@los/shared/models';

@Component({
  selector: 'los-gender-input',
  templateUrl: './gender-input.component.html',
  styleUrls: ['./gender-input.component.scss']
})
export class GenderInputComponent implements OnInit {
  @Input() control: FormControl;

  public appState: AppState;

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.storeService.getAppState()
      .subscribe((appState: AppState) => {
        this.appState = appState;
      });
  }
}
