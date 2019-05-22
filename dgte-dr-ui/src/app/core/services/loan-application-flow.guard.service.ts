import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class LoanApplicationFlowGuard implements CanActivate {
  private loanDetails;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storeService: StoreService) {
    this.storeService.get('loanDetails').subscribe(loanDetails => {
      this.loanDetails = loanDetails;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const { url } = state;
    const urls = url.split('/');
    const companyCode = urls[2];
    const companyId = urls[3];
    const loanReferenceNo = urls[4];
    const coMakerId = urls[5];

    if (url.includes('/b/') && url.includes('/confirmation')) {
      if (!this.loanDetails) {
        this.router.navigateByUrl(`/b/${companyCode}/${companyId}`);
      }
    }

    if (url.includes('/b/') && url.includes('/application-form')) {
      if (!this.loanDetails) {
        this.router.navigateByUrl(`/b/${companyCode}/${companyId}`);
      }
    }

    if (url.includes('/c/') && url.includes('/confirmation')) {
      if (!this.loanDetails) {
        this.router.navigateByUrl(`/c/${companyCode}/${companyId}/${loanReferenceNo}/${coMakerId}`);
      }
    }

    if (url.includes('/c/') && url.includes('/application-form')) {
      if (!this.loanDetails) {
        this.router.navigateByUrl(`/c/${companyCode}/${companyId}/${loanReferenceNo}/${coMakerId}`);
      }
    }

    return true;
  }
}
