import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from '@los/core/services';
import { AppState } from '@los/shared/models';
import { sortByProp } from '@los/shared/utils';

@Component({
  selector: 'los-place-of-birth-input',
  templateUrl: './place-of-birth-input.component.html',
  styleUrls: ['./place-of-birth-input.component.scss']
})
export class PlaceOfBirthInputComponent implements OnInit {
  @Input() control: FormControl;

  public appState: AppState;
  public placesOfBirth = [];

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.storeService.getAppState()
      .subscribe((appState: AppState) => {
        this.appState = appState;
        if (appState.adminDetails.placesOfBirth) {
          this.placesOfBirth = appState.adminDetails.placesOfBirth.sort(sortByProp('cityName'));
        }
      });
  }
}
