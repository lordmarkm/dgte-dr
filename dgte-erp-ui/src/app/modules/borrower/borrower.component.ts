import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AdminService, StoreService, AuthService } from '@los/core/services';
import { Company, CompanyLoanSettings } from '@los/shared/models';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  styleUrls: ['./borrower.component.scss']
})
export class BorrowerComponent implements OnInit {

  public companyLoanSettings: CompanyLoanSettings;
  public company: Company;
  public isLoading = false;

  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
              private storeService: StoreService,
              private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      const { id, code } = params;
      if (id && code) {
        // get initial company loan settings without rank
        this.isLoading = true;
        this.adminService.getCompanyLoanSettings({ code: code.toUpperCase() })
          .subscribe(companyLoanSettings => {
            // verify if id is correct
            if (companyLoanSettings.company.id === parseInt(id, 10)) {

              this.storeService.set('companyLoanSettings', companyLoanSettings);

              this.company = companyLoanSettings.company;

              // initialize state
              this.storeService.initState().subscribe(_ => {
                this.isLoading = false;
              }, err => {
                this.isLoading = false;
              });
            }
          }, err => {
            this.isLoading = false;
        });
      }
      this.isLoading = false;
    });
  }
}
