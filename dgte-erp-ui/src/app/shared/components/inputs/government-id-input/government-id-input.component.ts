import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StoreService } from '@los/core/services';
import { AppState } from '@los/shared/models';
import { sortBy } from '@los/shared/utils';


@Component({
  selector: 'los-government-id-input',
  templateUrl: './government-id-input.component.html',
  styleUrls: ['./government-id-input.component.scss']
})
export class GovernmentIdInputComponent implements OnInit {
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
            if (id.governmentId == "TIN" || id.governmentId == "SSS") {
              this.ids.push(id.governmentId);
            }
          });
          this.ids.sort(sortBy);
        }
      });
  }
}
