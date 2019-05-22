import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from '@los/core/services';
import { AppState } from '@los/shared/models';
import { sortByProp } from '@los/shared/utils';

@Component({
  selector: 'los-home-ownership-input',
  templateUrl: './home-ownership-input.component.html',
  styleUrls: ['./home-ownership-input.component.scss']
})
export class HomeOwnershipInputComponent implements OnInit {
  @Input() control: FormControl;

  public appState: AppState;
  public homeOwnerships = [];

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.storeService.getAppState()
      .subscribe((appState: AppState) => {
        this.appState = appState;
        if (appState.adminDetails.homeOwnerships) {
          this.homeOwnerships = appState.adminDetails.homeOwnerships.sort(sortByProp('description'));
        }
      });
  }
}
