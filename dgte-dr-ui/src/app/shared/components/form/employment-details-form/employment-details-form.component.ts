import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

const Cleave = require('cleave.js');

import { validateAllFormFields } from '@los/shared/utils';
import { EmploymentDetails, CompanyLoanSettings, Duration } from '@los/shared/models';
import { StoreService } from '@los/core/services';
import { durationRequiredValidator } from '@los/shared/validators';

@Component({
  selector: 'los-employment-details-form',
  templateUrl: './employment-details-form.component.html',
  styleUrls: ['./employment-details-form.component.scss']
})
export class EmploymentDetailsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public readonly = false;
  @Input() public type = 'coMaker';
  @Output() private handleSubmitSuccess: EventEmitter<any> = new EventEmitter();
  @Output() private handleSubmitFailed: EventEmitter<any> = new EventEmitter();
  @Output() private isValid: EventEmitter<boolean> = new EventEmitter();

  public employmentDetailsForm: FormGroup;
  public govIdNumberError = '';
  public govIdNumberPlaceholder = '';

  private $isFormBuilt: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private govIdNumInput;

  constructor(private formBuilder: FormBuilder,
              private storeService: StoreService) { }

  ngOnInit() {
    this.buildForm();

    if (this.type === 'borrower') {
      this.storeService.get('companyLoanSettings')
        .subscribe((companyLoanSettings: CompanyLoanSettings) => {
          if (companyLoanSettings) {
            this.adjustFormBasedOnCompanyLoanSettings(companyLoanSettings);
          }
        });

      this.storeService.get('borrowerEmploymentDetails')
        .subscribe((employmentDetails: EmploymentDetails) => {
          this.adjustFormBasedOnEmploymentDetails(employmentDetails);
        });
    }
  }

  ngAfterViewInit() {
    if (this.type === 'borrower') {
      this.govtId.valueChanges.subscribe(value => {
        if (this.govIdNumInput) {
          this.govIdNumInput.destroy();
        }
        this.govtIdNumber.setValue(null);
        this.govtIdNumber.setValidators(null);
        this.govtIdNumber.markAsPristine();
        document.getElementById('govtIdNumber')['value'] = null;

        if (value === 'SSS') {
          this.govtIdNumber.setValidators([Validators.required, Validators.minLength(10)]);
          this.govIdNumberError = 'Please enter at least 10 characters';
          this.govIdNumberPlaceholder = '12-3456-789-1';
          this.govIdNumInput = new Cleave('#govtIdNumber', {
            delimiter: '-',
            blocks: [2, 4, 3, 1],
            numericOnly: true,
            onValueChanged: (e) => {
              this.govtIdNumber.setValue(e.target.value.split('-').join(''));
            }
          });
        } else if (value === 'TIN') {
          this.govtIdNumber.setValidators([Validators.required, Validators.minLength(9)]);
          this.govIdNumberError = 'Please enter at least 9 characters';
          this.govIdNumberPlaceholder = '123-456-789-000';
          this.govIdNumInput = new Cleave('#govtIdNumber', {
            delimiter: '-',
            blocks: [3, 3, 3, 3],
            numericOnly: true,
            onValueChanged: (e) => {
              this.govtIdNumber.setValue(e.target.value.split('-').join(''));
            }
          });
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.govIdNumInput) {
      this.govIdNumInput.destroy();
    }
  }

  private buildForm(): void {
    if (this.type === 'borrower') {
      this.employmentDetailsForm = this.formBuilder.group({
        companyName: [null, [Validators.required]],
        employeeId: [null, [Validators.required, Validators.maxLength(50)]],
        govtId: [null, [Validators.required, Validators.maxLength(50)]],
        govtIdNumber: [null, [Validators.required, Validators.maxLength(50)]],
        rank: [null, [Validators.required]],
        position: [null, [Validators.required, Validators.maxLength(45)]],
        grossMonthlyIncome: null,
        tenure: this.formBuilder.group({
          years: 0,
          months: 0,
        },  {
          validators: [durationRequiredValidator]
        })
      });
    } else if (this.type === 'coMaker') {
      this.employmentDetailsForm = this.formBuilder.group({
        employeeId: [null, [Validators.required, Validators.maxLength(40)]]
      });
    }

    this.employmentDetailsForm.valueChanges.subscribe(value => {
      this.isValid.emit(this.employmentDetailsForm.valid);
    });

    this.$isFormBuilt.next(true);
  }

  private adjustFormBasedOnCompanyLoanSettings(companyLoanSettings: CompanyLoanSettings) {
    this.employmentDetailsForm.patchValue({
      companyName: companyLoanSettings.company.name
    });
  }

  private adjustFormBasedOnEmploymentDetails(employmentDetails: EmploymentDetails) {
    this.employmentDetailsForm.patchValue({
      rank: employmentDetails.rank,
      tenure: employmentDetails.tenure,
      grossMonthlyIncome: employmentDetails.grossMonthlyIncome
    });
  }

  private setFormValue(employmentDetails: EmploymentDetails): void {
    this.employmentDetailsForm.patchValue(employmentDetails);
  }

  public submit(redirect): void {
    validateAllFormFields(this.employmentDetailsForm);

    if (this.employmentDetailsForm.valid) {
      const employmentDetails: EmploymentDetails = this.employmentDetailsForm.value;

      // borrower form has disabled components so we need to manually set there value here
      if (this.type === 'borrower') {
        employmentDetails.rank = this.rank.value;
        employmentDetails.companyName = this.companyName.value;
        employmentDetails.tenure = new Duration(this.years.value, this.months.value);
        employmentDetails.grossMonthlyIncome = this.grossMonthlyIncome.value;

        if (employmentDetails.govtIdNumber.length === 9) {
          employmentDetails.govtIdNumber = employmentDetails.govtIdNumber + '000';
        }
      }
      this.handleSubmitSuccess.emit({redirect, employmentDetails});
    } else {
      this.handleSubmitFailed.emit();
    }
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

  @Input() set initialValue(employmentDetails: EmploymentDetails) {
    this.$isFormBuilt.subscribe(isBuilt => {
      if (isBuilt) {
        this.setFormValue(employmentDetails);
      }
    });
  }

  get initialValue(): EmploymentDetails { return this.initialValue; }

  get companyName() { return this.employmentDetailsForm.get('companyName'); }
  get employeeId() { return this.employmentDetailsForm.get('employeeId'); }
  get govtId() { return this.employmentDetailsForm.get('govtId'); }
  get govtIdNumber() { return this.employmentDetailsForm.get('govtIdNumber'); }
  get rank() { return this.employmentDetailsForm.get('rank'); }
  get position() { return this.employmentDetailsForm.get('position'); }
  get tenure() { return this.employmentDetailsForm.get('tenure'); }
  get grossMonthlyIncome() { return this.employmentDetailsForm.get('grossMonthlyIncome'); }
  get years() { return this.tenure.get('years'); }
  get months() { return this.tenure.get('months'); }
}
