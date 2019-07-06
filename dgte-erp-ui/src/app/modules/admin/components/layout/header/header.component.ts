import { Component, OnInit } from '@angular/core';

import { StoreService } from '@los/core/services';
import { AdminUserInfo, Company } from '@los/shared/models';


@Component({
  selector: 'los-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userInfo: AdminUserInfo;
  public hasJgSubsidiary = false;
  public selectedCompanyId: number;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.get('adminUserInfo').subscribe(userInfo => {
      if (userInfo) {
        this.userInfo = JSON.parse(JSON.stringify(userInfo));

        this.hasJgSubsidiary = this.userInfo.companies.some(company => company.jgSubsidiary);
        if (this.hasJgSubsidiary) {
          const company: Company = new Company();
          company.id = 1;
          company.name = 'JG Summit';

          this.selectedCompanyId = 1;
          this.userInfo.companies.unshift(company);
        }

        this.storeService.set('selectedCompany', this.userInfo.companies[0]);
      }
    });
  }

  // public selectCompany(companyId): void {
  //   companyId = parseInt(companyId, 10);
  //   const selectedCompany = this.userInfo.companies.find(company => company.id === companyId);
  //
  //   this.storeService.set('selectedCompany', selectedCompany);
  // }

}
