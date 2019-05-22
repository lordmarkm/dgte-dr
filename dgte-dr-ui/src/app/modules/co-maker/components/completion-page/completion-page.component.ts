import { Component, OnInit } from '@angular/core';
import { StoreService } from '@los/core/services';
import { AppState } from '@los/shared/models';

@Component({
  selector: 'los-completion-page',
  templateUrl: './completion-page.component.html',
  styleUrls: ['./completion-page.component.scss']
})
export class CompletionPageComponent implements OnInit {

  public appState: AppState;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.getAppState()
      .subscribe((appState: AppState) => {
        this.appState = appState;
      });
  }
}
