import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, AdminService, StoreService } from '@los/core/services';
import { Company, CompanyLoanSettings } from '@los/shared/models';

@Component({
  selector: 'los-comaker',
  templateUrl: './comaker.component.html',
  styleUrls: ['./comaker.component.scss']
})
export class ComakerComponent implements OnInit {

  public companyLoanSettings: CompanyLoanSettings;
  public company: Company;
  public isLoading = false;
  public referenceId;
  public coMakerId;

  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
              private storeService: StoreService,
              private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      const { id, code, referenceId, coMakerId } = params;
      if (id && code) {
        this.referenceId = referenceId;
        this.coMakerId = coMakerId;
        this.adminService.getCompanyLoanSettings({ code: code.toUpperCase() })
          .subscribe(companyLoanSettings => {
            // verify if id is correct
            if (companyLoanSettings.company.id === parseInt(id, 10)) {
              this.companyLoanSettings = companyLoanSettings;
              this.company = companyLoanSettings.company;
              this.storeService.set('companyLoanSettings', companyLoanSettings);

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
