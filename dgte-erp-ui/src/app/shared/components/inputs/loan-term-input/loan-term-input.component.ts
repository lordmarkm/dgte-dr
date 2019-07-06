import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from '@los/core/services';
import { CompanyLoanSettings } from '@los/shared/models';
import { Options, CustomStepDefinition } from 'ng5-slider';

@Component({
  selector: 'los-loan-term-input',
  templateUrl: './loan-term-input.component.html',
  styleUrls: ['./loan-term-input.component.scss']
})
export class LoanTermInputComponent implements OnInit {
  @Input() control: FormControl;

  private companyLoanSettings: CompanyLoanSettings;
  public labels: number[];
  public min: number;
  public max: number;
  public step: number;

  public options: Options
  private steps: CustomStepDefinition[] = [];
  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.get('companyLoanSettings')
      .subscribe((companyLoanSettings: CompanyLoanSettings) => {
        this.companyLoanSettings = companyLoanSettings;
        this.labels = companyLoanSettings.terms;

        // set the minimum loan term as the default value
        this.control.patchValue(companyLoanSettings.terms[0]);

        this.steps = [];
        this.labels.forEach(label => {
          this.steps.push({ value: label });
        });

        this.options = {
          showTicks: true,
          showTicksValues: true,
          stepsArray: this.steps
        };
      });
  }
}
