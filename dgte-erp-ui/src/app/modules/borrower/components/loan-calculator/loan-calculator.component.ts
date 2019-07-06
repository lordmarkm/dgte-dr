import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

const Decimal = require('decimal.js-light');
const Cleave = require('cleave.js');

import { StoreService, AdminService } from '@los/core/services';
import { CompanyLoanSettings, LoanDetails, EmploymentDetails, AppState } from '@los/shared/models';
import { validateAllFormFields } from '@los/shared/utils';
import { minMaxLoanAmountValidator, tenureValidator } from '@los/modules/borrower/validators';

@Component({
  selector: 'los-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss']
})
export class LoanCalculatorComponent implements OnInit, AfterViewInit, OnDestroy {
  public companyLoanSettings: CompanyLoanSettings;
  public loanCalculatorForm: FormGroup;
  public loanDetails: LoanDetails;
  public employmentDetails: EmploymentDetails;
  public isLoading = false;

  private grossSalaryInput;
  private amountInput;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private storeService: StoreService,
              private adminService: AdminService) { }

  ngOnInit() {
    this.buildForm();
    this.storeService.get('companyLoanSettings')
      .subscribe((companyLoanSettings: CompanyLoanSettings) => {
        this.companyLoanSettings = companyLoanSettings;
        this.adjustFormBasedOnCompanyDetails();
      });

    this.rank.valueChanges.subscribe(value => {
      const rank = value.split(' ').join('_').toUpperCase();
      this.isLoading = true;
      this.adminService.getCompanyLoanSettings({ code: this.companyLoanSettings.company.code.toUpperCase(), rank })
        .subscribe(companyLoanSettings => {
          this.companyLoanSettings = companyLoanSettings;
          this.adjustFormBasedOnCompanyDetails();
          this.isLoading = false;
        }, err => {
          this.isLoading = false;
        });
    });
  }

  ngAfterViewInit() {
    // format gross salary and manually set value without format
    this.grossSalaryInput = new Cleave('#grossSalary', {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      onValueChanged: (e) => {
        this.grossSalary.setValue(e.target.value.split(',').join(''));
      }
    });

    // format amount and manually set value without format
    this.amountInput = new Cleave('#amount', {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
      onValueChanged: (e) => {
        this.amount.setValue(e.target.value.split(',').join(''));
      }
    });
  }

  ngOnDestroy() {
    this.grossSalaryInput.destroy();
    this.amountInput.destroy();
  }

  private buildForm(): void {
    this.loanCalculatorForm = this.formBuilder.group({
      amount: [null, [Validators.required, Validators.minLength(2)]],
      purpose: [null, [Validators.required]],
      term: [null, [Validators.required]],
      grossSalary: [null, [Validators.required, Validators.minLength(5)]],
      rank: [null, [Validators.required]],
      years: 0,
      months: 0,
    });
  }

  private adjustFormBasedOnCompanyDetails(): void {
    this.loanCalculatorForm.setValidators(
      [
        tenureValidator(this.companyLoanSettings.minimumTenure),
        minMaxLoanAmountValidator(this.companyLoanSettings.minimumLoanAmount, this.companyLoanSettings.maximumLoanAmount,
            this.companyLoanSettings.gmiToMlaComputation)
      ]
    );
  }

  public calculateMonthlyAmmortization(): void {
    validateAllFormFields(this.loanCalculatorForm);

    if (this.loanCalculatorForm.valid) {
      // set loan details
      this.loanDetails = new LoanDetails();
      this.loanDetails.amount = parseInt(this.amount.value, 10);
      this.loanDetails.purpose = this.purpose.value;
      this.loanDetails.term = this.term.value;
      this.loanDetails.grossSalary = parseInt(this.grossSalary.value, 10);

      const rate = this.companyLoanSettings.rate;
      const term = this.term.value;
      const amount = this.loanDetails.amount;
      const addOnRate = new Decimal(rate).mul(term).div(100).add(1);
      const monthlyAmortization = new Decimal(amount).mul(addOnRate).div(term);

      this.loanDetails.monthlyAmmortization = monthlyAmortization.toNumber();
      this.loanDetails.addOnRate = addOnRate.toNumber();
      this.loanDetails.rate = rate;

      // set employment details
      this.employmentDetails = new EmploymentDetails();
      this.employmentDetails.rank = this.rank.value;
      this.employmentDetails.tenure.years = parseInt(this.years.value, 10);
      this.employmentDetails.tenure.months = parseInt(this.months.value, 10);
      this.employmentDetails.grossMonthlyIncome = parseInt(this.grossSalary.value, 10);
    }
  }

  public applyNow(): void {
    this.storeService.set('loanDetails', this.loanDetails);
    this.storeService.set('borrowerEmploymentDetails', this.employmentDetails);
    this.router.navigate(['confirmation'], {relativeTo: this.route});
  }

  public clear(ngForm): void {
    this.loanCalculatorForm.reset();
    ngForm.resetForm();
    this.loanDetails = null;
    this.employmentDetails = null;
    // set default term
    this.term.setValue(this.companyLoanSettings.terms[0]);
  }

  get amount() { return this.loanCalculatorForm.get('amount'); }
  get purpose() { return this.loanCalculatorForm.get('purpose'); }
  get term() { return this.loanCalculatorForm.get('term'); }
  get grossSalary() { return this.loanCalculatorForm.get('grossSalary'); }
  get rank() { return this.loanCalculatorForm.get('rank'); }
  get years() { return this.loanCalculatorForm.get('years'); }
  get months() { return this.loanCalculatorForm.get('months'); }
}
