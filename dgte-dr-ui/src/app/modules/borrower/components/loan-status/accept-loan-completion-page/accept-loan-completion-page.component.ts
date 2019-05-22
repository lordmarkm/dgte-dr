import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '@los/core/services';

@Component({
  selector: 'los-accept-loan-completion-page',
  templateUrl: './accept-loan-completion-page.component.html',
  styleUrls: ['./accept-loan-completion-page.component.scss']
})
export class AcceptLoanCompletionPageComponent {
  constructor(private router: Router,
              private storeService: StoreService) { }

  logout() {
    this.storeService.set('completeLoanDetails', {});
    this.router.navigateByUrl('/b/check-loan-status');
  }
}
