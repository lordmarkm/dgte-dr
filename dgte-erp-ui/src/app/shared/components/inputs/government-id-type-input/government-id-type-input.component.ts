import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StoreService } from '@los/core/services';
import { AppState } from '@los/shared/models';
import { sortBy } from '@los/shared/utils';


@Component({
  selector: 'los-government-id-type-input',
  templateUrl: './government-id-type-input.component.html',
  styleUrls: ['./government-id-type-input.component.scss']
})
export class GovernmentIdTypeInputComponent implements OnInit {
  @Input() control: FormControl;

  public appState: AppState;
  public ids = [];

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.getAppState()
      .subscribe((appState: AppState) => {
        this.appState = appState;

        if (appState.adminDetails.govIds) {
          this.ids = [];
          appState.adminDetails.govIds.forEach(id => {
            this.ids.push(id.governmentId);
          });
          this.ids.sort(sortBy);
        }
      });
  }
}
