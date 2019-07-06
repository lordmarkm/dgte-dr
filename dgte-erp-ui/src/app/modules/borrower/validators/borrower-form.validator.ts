import { FormGroup, ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";
const moment = require('moment');

export function minimumAge(age:number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    let result: ValidationErrors = null;

    if (control.value) {
      const date = moment(control.value).startOf('day');
      if (date.isValid()) {
        const now = moment().startOf('day');
        const yearsDiff = date.diff(now, 'years');
        if (yearsDiff > -age) {
          result = {
            'minimumAge': {
              'requiredAge': age,
              'actualAge': yearsDiff
            }
          };
        }
      }
    }
    return result;
  };
}

export function mobileNumberFormat(mobileNumber): ValidatorFn {
  return (fg: FormGroup): ValidationErrors => {
    let result: ValidationErrors = null;
    console.log("Form Group");
    console.log(fg);
    // if ()
    return result;
  }
}
