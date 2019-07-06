import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';

import { Subject, interval, Subscription, combineLatest } from 'rxjs';
import { flatMap, takeUntil } from 'rxjs/operators';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
const moment = require('moment');

import { LoansService, StoreService, AdminService } from '@los/core/services';
import { LoanSearch, Company, AdminUserInfo } from '@los/shared/models';
import { ROLE, APPLICATION_STATUS, APPLICATION_STATUS_LABEL, LIST_EXTERNAL_APPLICATION_STATUS, API_DATE_FORMAT } from '@los/shared/constants';

import { UpdateLoanStatusModalComponent } from '../update-loan-status-modal/update-loan-status-modal.component';
import { CompanySearch } from "@los/shared/models/company-search";

@Component({
  selector: 'los-endorsements',
  templateUrl: './endorsements.component.html',
  styleUrls: ['./endorsements.component.scss']
})
export class EndorsementsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tabset') tabset: NgbTabset;
  public LIST_EXTERNAL_APPLICATION_STATUS = LIST_EXTERNAL_APPLICATION_STATUS;
  public APPLICATION_STATUS_LABEL = APPLICATION_STATUS_LABEL;
  public pendingLoans = [];
  public allLoans = [];
  public plSearchQuery: LoanSearch = new LoanSearch();
  public allSearchQuery: LoanSearch = new LoanSearch();
  public referenceNumber = '';
  public status = '';
  public showSuccessMessage = false;
  public pendingNoRecordsMsg = 'No Pending Records';
  public allNoRecordsMsg = 'No Applications';
  public isPendingLoading = false;
  public isAllLoading = false;
  public userInfo: AdminUserInfo;
  public verifierRole = false;
  public endorserRole = false;
  public loanCalcRole = false;
  public companyUrl;
  public plAdvanceSearch = false;
  public allAdvanceSearch = false;
  public plStatus = '';
  public allStatus = null;
  public plApplicationDate;
  public allApplicationDate;
  public listOfCompanies: Company[] = [];
  public hasJgSubsidiary = false;
  public selectedCompanyId: number;
  public companySearchQuery: CompanySearch = new CompanySearch();

  private POLL_INTERVAL = 60000;
  private stopLoop = new Subject<void>();
  private selectedCompany: Company;

  constructor(private modalService: NgbModal,
              private loansService: LoansService,
              private adminService: AdminService,
              private storeService: StoreService) { }

  ngOnInit() {
    this.plSearchQuery.sort = 'createdDate,desc';
    this.allSearchQuery.sort = 'createdDate,desc';

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

        if (this.userInfo.roles.toString().includes("ROLE_PRTNR_VERIFIER")) {
          this.verifierRole = true;
        }

        if (this.userInfo.roles.toString().includes("ROLE_PRTNR_ENDORSER")) {
          this.endorserRole = true;
        }

        if (this.userInfo.roles.toString().includes("ROLE_LOAN_CALC")) {
          this.loanCalcRole = true;
        }
      }
    });

    this.adminService.getAllCompany(this.companySearchQuery).subscribe(resp => {
      this.listOfCompanies = resp.content;
    });

    combineLatest(
      this.storeService.get('adminUserInfo'),
      this.storeService.get('selectedCompany')
    ).subscribe(([adminUserInfo, company]) => {
      if (adminUserInfo && company) {
        adminUserInfo.roles.forEach(role => {
          if (role === ROLE.ROLE_PRTNR_VERIFIER) {
            this.plSearchQuery.statuses.push(APPLICATION_STATUS.FOR_HR_VERIFICATION.toString());
          }
          if (role === ROLE.ROLE_PRTNR_ENDORSER) {
            this.plSearchQuery.statuses.push(APPLICATION_STATUS.FOR_HR_ENDORSEMENT.toString());
          }
        });

        this.plSearchQuery.page = 0;
        this.allSearchQuery.page = 0;

        this.selectedCompany = company;
        if (company.name === 'JG Summit') {
          this.plSearchQuery.jgSummitEnabled = true;
          this.allSearchQuery.jgSummitEnabled = true;

          delete this.plSearchQuery.companyId;
          delete this.allSearchQuery.companyId;
        } else {
          delete this.plSearchQuery.jgSummitEnabled;
          delete this.allSearchQuery.jgSummitEnabled;

          this.plSearchQuery.companyId = this.selectedCompany.id;
          this.allSearchQuery.companyId = this.selectedCompany.id;
        }

        this.plSearchQuery.search = '';
        this.allSearchQuery.search = '';
        this.pendingNoRecordsMsg = 'No Pending Records';
        this.allNoRecordsMsg = 'No Applications';

        this.companyUrl = this.selectedCompany.companyUrl;
        this.getPendingLoans();
        this.getAllLoans();
      }
    });
  }

  ngOnDestroy() {
    this.stopLoop.next();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.tabset.select('allList');
    });
  }

  getPendingLoans() {
    this.isPendingLoading = true;

    if (this.plApplicationDate != null) {
      this.plSearchQuery.dateFrom = moment(this.plApplicationDate[0]).format(API_DATE_FORMAT);
      this.plSearchQuery.dateTo = moment(this.plApplicationDate[1]).format(API_DATE_FORMAT);
    }
    if (this.plSearchQuery.statuses.length > this.userInfo.roles.length) {
      this.plSearchQuery.statuses.shift();
    }
    if (this.plStatus) {
      this.plSearchQuery.statuses.unshift(this.plStatus);
    }

    const params: LoanSearch = Object.assign(this.plSearchQuery);

    this.loansService.getLoans(params)
      .subscribe(datatable => {
        this.isPendingLoading = false;
        this.pendingLoans = datatable.content;
        this.plSearchQuery.totalElements = datatable.totalElements;
        this.restartPooling();
      }, err => {
        this.isPendingLoading = false;
      });
  }

  getAllLoans() {
    this.isAllLoading = true;

    if (this.allApplicationDate != null) {
      this.allSearchQuery.dateFrom = moment(this.allApplicationDate[0]).format(API_DATE_FORMAT);
      this.allSearchQuery.dateTo = moment(this.allApplicationDate[1]).format(API_DATE_FORMAT);
    }
    if (this.allSearchQuery.statuses.length > 0) {
      this.allSearchQuery.statuses = [];
    }
    if (this.allStatus) {
      this.allStatus.forEach(status => {
        this.allSearchQuery.statuses.push(status);
      });
    }

    const params: LoanSearch = Object.assign(this.allSearchQuery);

    this.loansService.getLoans(params)
      .subscribe(datatable => {
        this.isAllLoading = false;
        this.allLoans = datatable.content;
        this.allSearchQuery.totalElements = datatable.totalElements;
        this.restartPooling();
      }, err => {
        this.isAllLoading = false;
      });
  }

  public selectCompany(companyId): void {
    companyId = parseInt(companyId, 10);
    const selectedCompany = this.userInfo.companies.find(company => company.id === companyId);

    this.storeService.set('selectedCompany', selectedCompany);
  }

  restartPooling() {
    this.stopLoop.next();
    interval(this.POLL_INTERVAL)
      .pipe(
        takeUntil(this.stopLoop.asObservable()),
        flatMap(() => this.loansService.getLoans(this.plSearchQuery))
      )
      .subscribe(datatable => {
        this.pendingLoans = datatable.content;
        this.plSearchQuery.totalElements = datatable.totalElements;
      });

    interval(this.POLL_INTERVAL)
      .pipe(
        takeUntil(this.stopLoop.asObservable()),
        flatMap(() => this.loansService.getLoans(this.allSearchQuery))
      )
      .subscribe(datatable => {
        this.allLoans = datatable.content;
        this.allSearchQuery.totalElements = datatable.totalElements;
      });
  }

  public onSort(table, event): void {
    const column: string = event.column.prop;

    if (table === 'pending') {
      this.plSearchQuery.sort = `${column},${event.newValue}`;
      this.getPendingLoans();
    } else if (table === 'all') {
      this.allSearchQuery.sort = `${column},${event.newValue}`;
      this.getAllLoans();
    }
  }

  public setPage(table, pageInfo) {
    const page = pageInfo.page - 1;

    if (table === 'pending') {
      this.plSearchQuery.setPageNumber(page);
      this.getPendingLoans();
    } else if (table === 'all') {
      this.allSearchQuery.setPageNumber(page);
      this.getAllLoans();
    }
  }

  public searchPendingLoans(): void {
    this.pendingNoRecordsMsg = 'No records found.';
    this.getPendingLoans();
  }

  public searchAllApplications(): void {
    this.allNoRecordsMsg = 'No records found.';
    this.getAllLoans();
  }

  public clearSearchPending(): void {
    if (this.plAdvanceSearch) {
      this.plStatus = null;
      if (this.plSearchQuery.statuses.length > this.userInfo.roles.length) {
        this.plSearchQuery.statuses.shift();
      }
      this.plSearchQuery.companyId = null;
      this.plSearchQuery.amountFrom = null;
      this.plSearchQuery.amountTo = null;
      this.plSearchQuery.termMonths = null;
      this.plSearchQuery.dateFrom = null;
      this.plSearchQuery.dateTo = null;
      this.plApplicationDate = null;


    } else {
      this.plSearchQuery.search = '';
    }

    this.getPendingLoans();
  }

  public clearSearchAll(): void {
    if (this.allAdvanceSearch) {
      this.allStatus = null;
      if (this.allSearchQuery.statuses.length > 0) {
        this.allSearchQuery.statuses.shift();
      }
      this.allSearchQuery.companyId = null;
      this.allSearchQuery.amountFrom = null;
      this.allSearchQuery.amountTo = null;
      this.allSearchQuery.termMonths = null;
      this.allSearchQuery.dateFrom = null;
      this.allSearchQuery.dateTo = null;
      this.allApplicationDate = null;
    } else {
      this.allSearchQuery.search = '';
    }

    this.getAllLoans();
  }

  public hideSuccessMessage(): void {
    this.showSuccessMessage = false;
  }

  public verifyLoan(loanDetails) {
    const modalRef = this.modalService.open(UpdateLoanStatusModalComponent);
    modalRef.componentInstance.loanDetails = loanDetails;
    modalRef.componentInstance.status = 'verify';

    modalRef.result.then(this.handleActionResponse);
  }

  public endorseLoan(loanDetails) {
    const modalRef = this.modalService.open(UpdateLoanStatusModalComponent);
    modalRef.componentInstance.loanDetails = loanDetails;
    modalRef.componentInstance.status = 'endorse';

    modalRef.result.then(this.handleActionResponse);
  }

  public declineLoan(loanDetails) {
    const modalRef = this.modalService.open(UpdateLoanStatusModalComponent);
    modalRef.componentInstance.loanDetails = loanDetails;
    modalRef.componentInstance.status = 'decline';

    modalRef.result.then(this.handleActionResponse);
  }

  handleActionResponse = ({refNo, status}) => {
    this.referenceNumber = refNo;
    this.status = status;
    this.showSuccessMessage = true;

    // refresh both tables
    this.getPendingLoans();
    this.getAllLoans();
  }

  formatValues(value): string {
    let newValue = value.replace(/_/g, " ");
    var words = newValue.split(" ");
    for ( var letterIndex = 0; letterIndex < words.length; letterIndex++ )
    {
      var firstLetter = words[letterIndex].charAt(0).toUpperCase();
      words[letterIndex] = firstLetter + words[letterIndex].substr(1).toLowerCase();
    }
    return words.join(" ");
  }

  canEndorse(loanDetails) {
    if (loanDetails) {
      for (let endorserIndex = 0; endorserIndex < loanDetails.endorsers.length; endorserIndex++) {
        if (loanDetails.endorsers[endorserIndex].userName === this.userInfo.username) {
          return false;
        }
      }
      return true;
    }
  }
}
