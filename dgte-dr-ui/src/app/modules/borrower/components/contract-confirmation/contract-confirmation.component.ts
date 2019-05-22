import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService, ConfirmationModalService } from '@los/core/services';
import { AppState } from '@los/shared/models';
import { CanComponentDeactivate } from '@los/core/interfaces';

@Component({
  selector: 'los-contract-confirmation',
  templateUrl: './contract-confirmation.component.html',
  styleUrls: ['./contract-confirmation.component.scss']
})
export class ContractConfirmationComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  public appState: AppState;
  public isAccepted = false;

  private refreshListener;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storeService: StoreService,
              private confirmationModalService: ConfirmationModalService) { }

  ngOnInit() {
    this.storeService.getAppState()
      .subscribe((appState: AppState) => {
        this.appState = appState;
      });

    this.refreshListener = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', this.refreshListener);
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.refreshListener);
  }

  canDeactivate() {
    return new Promise<boolean>((resolve, reject) => {
      this.confirmationModalService.confirm('Are you sure you want to go back?').result.then((result) => {
        if (result === 'confirm') {
          resolve(true);
        }
      }, (reason) => {
        resolve(false);
      });
    });
  }

  onAccepted(acceptedTimestamp): void {
    const loanDetails = this.appState.loanDetails;
    loanDetails.borrowerAcceptedTimestamp = acceptedTimestamp;

    this.storeService.set('loanDetails', loanDetails);
  }

  onContinue(): void {
    const loanDetails = this.appState.loanDetails;
    loanDetails.borrowerTermsAndConditionsAccepted = true;
    loanDetails.borrowerDataPrivacyAccepted = true;

    this.storeService.set('loanDetails', loanDetails);
    this.router.navigate(['../application-form'], {relativeTo: this.route});
  }

}
