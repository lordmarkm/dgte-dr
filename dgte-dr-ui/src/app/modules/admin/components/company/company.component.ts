import { Component, OnInit } from '@angular/core';
import { AdminService } from "@los/core/services";
import { CompanySearch } from "@los/shared/models/company-search";
import { flatMap, takeUntil } from 'rxjs/operators';
import { interval, Subject } from "rxjs/index";

@Component({
  selector: 'los-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  public allCompany: object[];

  public isCompanyLoading: boolean = false;
  public companyNoRecordMsg: string = '';

  public companySearchQuery: CompanySearch = new CompanySearch();
  private POLL_INTERVAL = 60000;
  private stopLoop = new Subject<void>();

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.companySearchQuery.sort = 'createdDate,desc';
    this.isCompanyLoading = true;
    this.companySearchQuery.search = '';
    this.companyNoRecordMsg = 'No Pending Records';
    this.isCompanyLoading = false;
    this.getCompanyList();
  }

  public searchCompany(): void {
    this.companyNoRecordMsg = 'No company records found.';
    this.getCompanyList();
  }

  public getCompanyList() {
    this.isCompanyLoading = true;

    const params: CompanySearch = Object.assign(this.companySearchQuery);

    this.adminService.getAllCompany(this.companySearchQuery)
      .subscribe(datatable => {
        this.isCompanyLoading = false;
        this.allCompany = datatable.content;
        this.companySearchQuery.totalElements = datatable.totalElements;
        this.restartPooling();
      }, err => {
        this.isCompanyLoading = false;
      });
  }

  restartPooling() {
    this.stopLoop.next();
    interval(this.POLL_INTERVAL)
      .pipe(
        takeUntil(this.stopLoop.asObservable()),
        flatMap(() => this.adminService.getAllCompany(this.companySearchQuery))
      )
      .subscribe(datatable => {
        this.allCompany = datatable.content;
        this.companySearchQuery.totalElements = datatable.totalElements;
      });
  }

  public onSort(event): void {
    const column: string = event.column.prop;
    this.companySearchQuery.sort = `${column},${event.newValue}`;
    this.getCompanyList();
  }

  public clearSearch() {
    this.companySearchQuery.search = '';
    this.getCompanyList();
  }

  public setPage(pageInfo) {
    const page = pageInfo.page - 1;
    this.companySearchQuery.setPageNumber(page);
    this.getCompanyList();
  }
}
