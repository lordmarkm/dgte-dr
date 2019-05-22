import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from '@los/core/services';
import { AppState } from '@los/shared/models';
import { sortBy } from '@los/shared/utils';

@Component({
  selector: 'los-civil-status-input',
  templateUrl: './civil-status-input.component.html',
  styleUrls: ['./civil-status-input.component.scss']
})
export class CivilStatusInputComponent implements OnInit {
  @Input() control: FormControl;

  public appState: AppState;
  public civilStatuses = [];

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.storeService.getAppState()
      .subscribe((appState: AppState) => {
        this.appState = appState;

        if (appState.adminDetails.civilStatuses) {
          this.civilStatuses = [];
          appState.adminDetails.civilStatuses.forEach(civilStatus => {
            this.civilStatuses.push(civilStatus.description);
          });
          this.civilStatuses.sort(sortBy);
        }
      });
  }
}
