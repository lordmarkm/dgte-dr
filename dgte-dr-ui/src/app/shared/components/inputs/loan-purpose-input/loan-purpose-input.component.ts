import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from '@los/core/services';
import { AppState } from '@los/shared/models';
import { sortBy } from '@los/shared/utils';

@Component({
  selector: 'los-loan-purpose-input',
  templateUrl: './loan-purpose-input.component.html',
  styleUrls: ['./loan-purpose-input.component.scss']
})
export class LoanPurposeInputComponent implements OnInit {
  @Input() control: FormControl;

  public appState: AppState;
  public purposes = [];

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.getAppState()
      .subscribe((appState: AppState) => {
        this.appState = appState

        if (appState.adminDetails.loanPurposes && appState.companyLoanSettings.loanPurposes) {
          this.purposes = [];
          appState.adminDetails.loanPurposes.forEach(purpose => {
            this.purposes.push(purpose.purpose);
          });
          appState.companyLoanSettings.loanPurposes.forEach(purpose => {
            this.purposes.push(purpose);
          });
          this.purposes.sort(sortBy);
        }
      });
  }
}

