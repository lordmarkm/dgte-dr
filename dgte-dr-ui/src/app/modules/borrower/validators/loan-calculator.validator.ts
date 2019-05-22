import { FormGroup, ValidatorFn } from '@angular/forms';
import { GmiComputation } from '@los/shared/models';

export function minMaxLoanAmountValidator(min: number, max: number, gmis: GmiComputation[]): ValidatorFn {
  return (group: FormGroup) => {
    const amount = parseInt(group.get('amount').value, 10);
    const grossSalary = parseInt(group.get('grossSalary').value, 10);

    if (amount < min) {
      return { minLoanAmount: true };
    } else if (amount > max) {
      return { maxLoanAmount: true };
    } else {
      if (grossSalary && grossSalary > gmis[0].minGmi && grossSalary < gmis[gmis.length - 1].maxGmi) {
        let gmiBracket: GmiComputation;
        // get gmi bracket based on amount
        // use array.some() cause we want the loop to stop once gmiBracket is found
        gmis.some(gmi => {
          if (grossSalary >= gmi.minGmi && grossSalary <= gmi.maxGmi ) {
            gmiBracket = gmi;
            return true;
          } else {
            return false;
          }
        });

        const maxLoanAmount = gmiBracket.multiplier * grossSalary;
        if (maxLoanAmount < amount) {
          return { userMaxLoanAmount: true };
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  };
}

export function tenureValidator(minTenure: number): ValidatorFn {
  return (group: FormGroup) => {
    const durationYears = group.get('years').value;
    const durationMonths = group.get('months').value;
    const rank = group.get('rank').value;
    const yearsAsNum = (durationYears) ? parseInt(durationYears, 10) : 0;
    const monthsAsNum = (durationMonths) ? parseInt(durationMonths, 10) : 0;
    const totalDurationInMonths = (yearsAsNum * 12) + monthsAsNum;

    if (yearsAsNum === 0 && monthsAsNum === 0) {
      return { emptyDuration: true };
    } else if (rank === 'RANK_AND_FILE' && totalDurationInMonths < minTenure) {
      return { min: true };
    } else if (rank === 'OFFICER' && totalDurationInMonths < minTenure) {
      return { min: true };
    } else {
      return null;
    }
  };
}
