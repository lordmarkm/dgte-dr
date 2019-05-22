import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fullNameValidator(fullName): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value) {
      const values = control.value.toLowerCase().split(' ');
      const names = fullName.toLowerCase().split(' ');

      // check if field name has all of full name
      let matchA = true;
      names.forEach(name => {
        if (!values.includes(name.toLowerCase())) {
          matchA = false;
        }
      });

      // check if full name has all of field name
      let matchB = true;
      values.forEach(value => {
        if (!names.includes(value.toLowerCase())) {
          matchB = false;
        }
      });

      // throw error if either doesnt match
      if (!matchA || !matchB) {
        return {
          fullName: true
        };
      } else {
        return null;
      }
    }
  };
}
