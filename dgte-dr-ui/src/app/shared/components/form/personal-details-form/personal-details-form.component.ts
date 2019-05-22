import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
const Cleave = require('cleave.js');
const moment = require('moment');
import { mobiscroll, MbscDatetimeOptions, MbscFormOptions } from '@mobiscroll/angular';

import { validateAllFormFields } from '@los/shared/utils';
import { PersonalDetails } from '@los/shared/models';
import { StoreService } from '@los/core/services';
import { minimumAge } from "@los/modules/borrower/validators";
import { MOBILE_NUMBER_FORMAT } from "@los/shared/constants";

@Component({
  selector: 'los-personal-details-form',
  templateUrl: './personal-details-form.component.html',
  styleUrls: ['./personal-details-form.component.scss']
})
export class PersonalDetailsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public readonly = false;
  @Input() public type = '';
  @Output() private handleSubmitSuccess: EventEmitter<any> = new EventEmitter();
  @Output() private handleSubmitFailed: EventEmitter<any> = new EventEmitter();
  @Output() private isValid: EventEmitter<boolean> = new EventEmitter();

  public personalDetailsForm: FormGroup;
  public mobileSettings: MbscDatetimeOptions = {
    display: 'bubble',
    onSet: (event, inst) => {
      document.getElementById('dateOfBirth')['value'] = event.valueText;
      this.dateOfBirth.setValue(moment(event.valueText, 'MM/DD/YYYY', true).toISOString());
    },
  };

  private placesOfBirth = [];
  private $isFormBuilt: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $isComponentRendered: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private dateOfBirthInput = null;

  constructor(private formBuilder: FormBuilder,
              private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.get('adminDetails')
      .subscribe((adminDetails) => {
        if (adminDetails.placesOfBirth) {
          this.placesOfBirth = adminDetails.placesOfBirth;
        }
      });

    this.buildForm();
  }

  ngAfterViewInit() {
    this.dateOfBirthInput = new Cleave('#dateOfBirth', {
      date: true,
      delimiter: '/',
      datePattern: ['m', 'd', 'Y'],
      onValueChanged: (e) => {
        this.dateOfBirth.setValue(null);
        const date = moment(e.target.value, 'MM/DD/YYYY', true);
        if (date.isValid()) {
          this.dateOfBirth.setValue(date.toISOString());
        }
      }
    });
    this.$isComponentRendered.next(true);
  }

  ngOnDestroy() {
    if (this.dateOfBirthInput) {
      this.dateOfBirthInput.destroy();
    }
  }

  private buildForm(): void {
    this.personalDetailsForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.maxLength(40)]],
      middleName: null,
      lastName: [null, [Validators.required, Validators.maxLength(40)]],
      civilStatus: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      emailAdd: [null, [Validators.required, Validators.email]],
      dateOfBirth: null,
      placeOfBirth: [null, [Validators.required]],
      placeOfBirthCode: null,
      mobileNumber: [null, [
        Validators.required,
        Validators.pattern(MOBILE_NUMBER_FORMAT), Validators.minLength(11), Validators.maxLength(11)]],
      landLineAreaCode: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(6)]],
      landLineNumber: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(8)]]
    });
    this.dateOfBirth.setValidators([minimumAge(18), Validators.required]);

    this.personalDetailsForm.valueChanges.subscribe(value => {
      this.isValid.emit(this.personalDetailsForm.valid);
    });

    this.$isFormBuilt.next(true);
    this.placeOfBirth.valueChanges.subscribe(value => {
      const placeOfBirth = this.placesOfBirth.find(city => city.cityName === value);
      this.placeOfBirthCode.setValue(placeOfBirth.cityCode);
    });
  }

  private setFormValue(personalDetails: PersonalDetails): void {
    if (personalDetails) {
      this.personalDetailsForm.patchValue(personalDetails);
      this.$isComponentRendered.subscribe( isRendered => {
        if (isRendered) {
          document.getElementById('dateOfBirth')['value'] = moment(personalDetails.dateOfBirth).format('MM/DD/YYYY');
        }
      });
    }
  }

  public submit(redirect): void {
    validateAllFormFields(this.personalDetailsForm);
    this.dateOfBirth.markAsDirty();

    if (this.personalDetailsForm.valid) {
      const personalDetails: PersonalDetails = this.personalDetailsForm.value;

      if (this.type === 'coMaker') {
        personalDetails.emailAdd = this.emailAdd.value;
        personalDetails.mobileNumber = this.mobileNumber.value;
      }

      this.handleSubmitSuccess.emit({redirect, personalDetails});
    } else {
      this.handleSubmitFailed.emit();
    }
  }

  @Input() set initialValue(personalDetails: PersonalDetails) {
    this.$isFormBuilt.subscribe(isBuilt => {
      if (isBuilt && Object.keys(personalDetails).length !== 0) {
        this.setFormValue(personalDetails);
      }
    });
  }

  get initialValue(): PersonalDetails { return this.initialValue; }

  get firstName() { return this.personalDetailsForm.get('firstName'); }
  get middleName() { return this.personalDetailsForm.get('middleName'); }
  get lastName() { return this.personalDetailsForm.get('lastName'); }
  get civilStatus() { return this.personalDetailsForm.get('civilStatus'); }
  get gender() { return this.personalDetailsForm.get('gender'); }
  get emailAdd() { return this.personalDetailsForm.get('emailAdd'); }
  get dateOfBirth() { return this.personalDetailsForm.get('dateOfBirth'); }
  get placeOfBirth() { return this.personalDetailsForm.get('placeOfBirth'); }
  get placeOfBirthCode() { return this.personalDetailsForm.get('placeOfBirthCode'); }
  get mobileNumber() { return this.personalDetailsForm.get('mobileNumber'); }
  get landLineAreaCode() { return this.personalDetailsForm.get('landLineAreaCode'); }
  get landLineNumber() { return this.personalDetailsForm.get('landLineNumber'); }
}
