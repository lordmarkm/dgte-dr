import { Component, OnInit } from '@angular/core';
import { StoreService } from '@los/core/services';
import { CompanyLoanSettings } from '@los/shared/models';

@Component({
  selector: 'los-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public companyLoanSettings: CompanyLoanSettings;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.get('companyLoanSettings')
      .subscribe((companyLoanSettings: CompanyLoanSettings) => {
        this.companyLoanSettings = companyLoanSettings;
      });
  }
}
