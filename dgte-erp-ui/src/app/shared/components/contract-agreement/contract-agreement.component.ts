import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StoreService } from '@los/core/services';
import { AppState } from '@los/shared/models';

@Component({
  selector: 'los-contract-agreement',
  templateUrl: './contract-agreement.component.html',
  styleUrls: ['./contract-agreement.component.scss']
})
export class ContractAgreementComponent implements OnInit {
  @Output() private handleAccepted: EventEmitter<string> = new EventEmitter();
  @Output() private handleContinue: EventEmitter<any> = new EventEmitter();

  public appState: AppState;
  public isAccepted = false;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.getAppState()
      .subscribe((appState: AppState) => {
        this.appState = appState;
      });
  }

  getTimestamp(event) {
    const checked = event.target.checked;

    if (checked) {
      this.handleAccepted.emit(new Date().toISOString());
    }
  }

  continue() {
    this.handleContinue.emit();
  }
}
