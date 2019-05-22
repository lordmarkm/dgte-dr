import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { validateAllFormFields } from '@los/shared/utils';
import { durationRequiredValidator } from '@los/shared/validators';
import { CompleteAddress } from '@los/shared/models';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'los-complete-address-form',
  templateUrl: './complete-address-form.component.html',
  styleUrls: ['./complete-address-form.component.scss']
})
export class CompleteAddressFormComponent implements OnInit {
  @Input() public readonly = false;
  @Output() private handleSubmitSuccess: EventEmitter<any> = new EventEmitter();
  @Output() private handleSubmitFailed: EventEmitter<any> = new EventEmitter();
  @Output() private isValid: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('presentAddressForm') private presentAddressForm: AddressFormComponent;
  @ViewChild('permanentAddressForm') private permanentAddressForm: AddressFormComponent;

  public completeAddressForm: FormGroup;
  public sameWithPresent = false;
  private $isFormBuilt: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.completeAddressForm = this.formBuilder.group({
      permanent: this.formBuilder.group({
        homeNumber: null,
        streetNumber: null,
        streetName: [null, [Validators.required]],
        cityName: [null, [Validators.required]],
        province: [null, [Validators.required]],
        zipCode: [null, [Validators.required]]
      }),
      present: this.formBuilder.group({
        homeNumber: null,
        streetNumber: null,
        streetName: [null, [Validators.required]],
        cityName: [null, [Validators.required]],
        province: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        houseOwnership: [null, [Validators.required]],
      }),
      periodOfStay: this.formBuilder.group({
        years: 0,
        months: 0,
      }, {
        validators: [durationRequiredValidator]
      })
    });

    this.completeAddressForm.valueChanges.subscribe(value => {
      this.isValid.emit(this.completeAddressForm.valid);
    });

    this.$isFormBuilt.next(true);
  }

  private setFormValue(complete: CompleteAddress): void {
    if (complete) {
      this.completeAddressForm.patchValue(complete);
    }
  }

  public submit(redirect): void {
    validateAllFormFields(this.completeAddressForm);

    if (this.completeAddressForm.valid) {
      const completeAddress: CompleteAddress = this.completeAddressForm.getRawValue();
      this.handleSubmitSuccess.emit({redirect, completeAddress});
    } else {
      this.handleSubmitFailed.emit();
    }
  }

  @Input() set initialValue(completeAddress: CompleteAddress) {
    this.$isFormBuilt.subscribe(isBuilt => {
      if (isBuilt) {
        this.setFormValue(completeAddress);
      }
    });
  }

  public adjustPermanentValues(event) {
    const { checked } = event.currentTarget;

    if (checked) {
      this.permanentAddressForm.setCities(this.presentAddressForm.getCities());
      this.permanentAddressForm.setZipCodes(this.presentAddressForm.getZipCodes());
      this.completeAddressForm.patchValue({
        permanent: this.completeAddressForm.value.present
      });
      // disable permanent address controls
      this.permanentAddressForm.homeNumber.disable();
      this.permanentAddressForm.streetNumber.disable();
      this.permanentAddressForm.streetName.disable();
      this.permanentAddressForm.cityName.disable();
      this.permanentAddressForm.province.disable();
      this.permanentAddressForm.zipCode.disable();
    } else {
      this.permanentAddressForm.setCities([]);
      this.permanentAddressForm.setZipCodes([]);
      this.completeAddressForm.patchValue({
        permanent: {
          homeNumber: '',
          streetNumber: '',
          streetName: null,
          cityName: '',
          province: '',
          zipCode: '',
          houseOwnership: '',
        }
      });
      // enable permanent address controls
      this.permanentAddressForm.homeNumber.enable();
      this.permanentAddressForm.streetNumber.enable();
      this.permanentAddressForm.streetName.enable();
      this.permanentAddressForm.cityName.enable();
      this.permanentAddressForm.province.enable();
      this.permanentAddressForm.zipCode.enable();
    }
  }

  get initialValue(): CompleteAddress { return this.initialValue; }
  get permanentFormGroup() { return this.completeAddressForm.get('permanent'); }
  get presentFormGroup() { return this.completeAddressForm.get('present'); }
  get periodOfStay() { return this.completeAddressForm.get('periodOfStay'); }
}
