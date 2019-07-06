import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
const Decimal = require('decimal.js-light');
const moment = require('moment');
const Cleave = require('cleave.js');

import { AttachmentsModalComponent } from './attachments-modal/attachments-modal.component';
import { UpdateLoanStatusModalComponent } from '../update-loan-status-modal/update-loan-status-modal.component';
import { LoansService, AdminService, StoreService } from '@los/core/services';
import { PersonalDetails, CompleteAddress, Company, CompanyLoanSettings, AppState, AdminUserInfo } from '@los/shared/models';
import { APPLICATION_STATUS_LABEL, READABLE_DATE_TIME_FORMAT } from '@los/shared/constants';
import { AddNoteModalComponent } from '../add-note-modal/add-note-modal.component';

@Component({
  selector: 'los-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss']
})
export class LoanDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  public APPLICATION_STATUS_LABEL = APPLICATION_STATUS_LABEL;
  public READABLE_DATE_TIME_FORMAT = READABLE_DATE_TIME_FORMAT;
  public moment = moment;
  public loanDetails;
  public borrowerPersonalDetails: PersonalDetails;
  public borrowerCompleteAddress: CompleteAddress;
  public computedMonthlyAmortization: number;

  public appState: AppState;
  public loanAmount: number;
  public termMonths: number;
  public canEditLoadDetails: boolean = false;
  public isEndorser: boolean = false;
  public canEndorse: boolean = true;
  public hasCompanyAccess: boolean = false;
  public terms: number[];
  public isLoading = false;
  public showSuccessMessage = false;
  public status = '';
  public referenceNumber = '';
  public reformattedRank = '';

  private company: Company;
  private companyLoanSettings: CompanyLoanSettings;

  public userInfo: AdminUserInfo;
  public verifierRole = false;
  public endorserRole = false;
  public loanCalcRole = false;
  public aoRole = false;

  public changeStatusSuccessMsg = false;
  public addNoteSuccessMsg = false;
  private amountInput;
  private $formLoaded = new Subject();

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private loanService: LoansService,
              private adminService: AdminService,
              private storeService: StoreService,
              private router: Router) { }

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    this.$formLoaded
      .pipe(delay(100))
      .subscribe(() => {
        if (this.canEditLoadDetails) {
          document.getElementById('amount')['value'] = this.loanDetails.amount;
        }

        this.amountInput = new Cleave('#amount', {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
          onValueChanged: (e) => {
            this.loanAmount = e.target.value.split(',').join('');
            document.getElementById('amount')['value'] = e.target.value;
          }
        });
      });
  }

  ngOnDestroy() {
    if (this.amountInput) {
      this.amountInput.destroy();
    }
  }

  init() {
    this.route.params.subscribe(params => {
      const { id } = params;

      this.storeService.get('adminUserInfo').subscribe(userInfo => {
        if (userInfo) {
          this.userInfo = JSON.parse(JSON.stringify(userInfo));
          if (this.userInfo.roles.toString().includes("ROLE_PRTNR_VERIFIER")) {
            this.verifierRole = true;
          }

          if (this.userInfo.roles.toString().includes("ROLE_PRTNR_ENDORSER")) {
            this.endorserRole = true;
          }

          if (this.userInfo.roles.toString().includes("ROLE_LOAN_CALC")) {
            this.loanCalcRole = true;
          }

          if (this.userInfo.roles.toString().includes("ROLE_CHASSIS_AO")) {
            this.aoRole = true;
          }
        }
      });

      this.isLoading = true;
      this.loanService.getLoanDetails(id).subscribe((loanDetails: any) => {
        this.loanDetails = loanDetails;
        this.loanAmount = loanDetails.amount;
        this.termMonths = loanDetails.termMonths;
        // check if current endorser user already endorsed loan
        for (let endorserIndex = 0; endorserIndex < loanDetails.endorsers.length; endorserIndex++) {
          if (loanDetails.endorsers[endorserIndex].userName === this.userInfo.username) {
            this.canEndorse = false;
            break;
          }
        }
        this.reformattedRank = this.formatValues(this.loanDetails.borrower.employmentDetails.rank);
        this.adminService.getCompany({ id: loanDetails.companyId })
          .subscribe(company => {
            this.company = company;
            const rank = loanDetails.borrower.employmentDetails.rank.split(' ').join('_').toUpperCase();
            this.userInfo.companies.forEach(company => {
              if (company.id === this.loanDetails.companyId) {
                this.hasCompanyAccess = true;
              }
            });
            if (!this.hasCompanyAccess) {
              this.router.navigate(['/admin/loans']);
            }
            this.adminService.getCompanyLoanSettings({ code: company.code.toUpperCase(), rank })
              .subscribe(companyLoanSettings => {
                this.isLoading = false;
                this.companyLoanSettings = companyLoanSettings;
                this.terms = this.companyLoanSettings.terms;
                this.computeMonthlyAmortization();

                this.storeService.getAppState().subscribe(appState => {
                  this.appState = appState;
                  this.appState.adminUserInfo.roles.forEach(role => {
                    if (role === 'ROLE_PRTNR_ENDORSER') {
                      this.isEndorser = true;
                      return;
                    }
                  });
                  this.canEditLoadDetails = this.isEndorser && this.loanDetails.status === 'FOR_HR_ENDORSEMENT'
                                              && this.canEndorse;
                  this.$formLoaded.next();
                  this.$formLoaded.complete();

                });
              }, err => {
                this.isLoading = false;
              });
        });
      });
    });
  }

  openAttachments() {
    const modalRef = this.modalService.open(AttachmentsModalComponent, { windowClass: 'attachments', size: 'lg' });
    modalRef.componentInstance.loanDetails = this.loanDetails;
  }

  computeMonthlyAmortization() {
    const rate = this.companyLoanSettings.rate;
    const term = this.loanDetails.termMonths;
    const amount = this.loanDetails.amount;

    const addOnRate = new Decimal(rate).mul(term).div(100).add(1);
    const monthlyAmortization = new Decimal(amount).mul(addOnRate).div(term);

    this.computedMonthlyAmortization = monthlyAmortization.toNumber();
    this.loanDetails.monthlyAmortizationAmount = this.computedMonthlyAmortization;
  }

  updateLoanDetails() {
    this.loanDetails.termMonths = this.termMonths;
    this.loanDetails.amount = this.loanAmount;

    this.computeMonthlyAmortization();
  }

  public verifyLoan() {
    this.changeStatusSuccessMsg = true;
    this.addNoteSuccessMsg = false;
    const modalRef = this.modalService.open(UpdateLoanStatusModalComponent);
    modalRef.componentInstance.loanDetails = this.loanDetails;
    modalRef.componentInstance.status = 'verify';

    modalRef.result.then(this.handleActionResponse);
  }

  public endorseLoan() {
    this.changeStatusSuccessMsg = true;
    this.addNoteSuccessMsg = false;
    this.updateLoanDetails();
    const modalRef = this.modalService.open(UpdateLoanStatusModalComponent);
    modalRef.componentInstance.loanDetails = this.loanDetails;
    modalRef.componentInstance.status = 'endorse';

    modalRef.result.then(this.handleActionResponse);
  }

  public declineLoan() {
    this.changeStatusSuccessMsg = true;
    this.addNoteSuccessMsg = false;
    const modalRef = this.modalService.open(UpdateLoanStatusModalComponent);
    modalRef.componentInstance.loanDetails = this.loanDetails;
    modalRef.componentInstance.status = 'decline';

    modalRef.result.then(this.handleActionResponse);
  }

  handleActionResponse = ({refNo, status}) => {
    this.status = status;
    this.referenceNumber = refNo;
    this.showSuccessMessage = true;
    this.init();
  };

  public hideSuccessMessage(): void {
    this.showSuccessMessage = false;
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

  public addNote() {
    this.addNoteSuccessMsg = true;
    this.changeStatusSuccessMsg = false;
    const modalRef = this.modalService.open(AddNoteModalComponent);
    modalRef.componentInstance.loanDetails = this.loanDetails;

    modalRef.result.then(this.handleActionResponse);
  }
}
