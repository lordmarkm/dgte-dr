import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {AdminService} from "@los/core/services";
import {Company} from "@los/shared/models";

@Component({
  selector: 'los-view',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  public companyId: number;
  public companyDetails;

  public isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
              private adminService: AdminService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const { id } = params;
      this.companyId = id;
      this.isLoading = true;
      this.adminService.getCompany({ id: this.companyId }).subscribe(response => {
        this.companyDetails = response;
        this.isLoading = false;
      });
    });
  }

}
