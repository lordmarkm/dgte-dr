import { FormGroup } from '@angular/forms';

export function durationRequiredValidator(group: FormGroup) {
  const durationYears = group.get('years').value;
  const durationMonths = group.get('months').value;
  const yearsAsNum = (durationYears) ? parseInt(durationYears, 10) : 0;
  const monthsAsNum = (durationMonths) ? parseInt(durationMonths, 10) : 0;

  if (yearsAsNum === 0 && monthsAsNum === 0) {
    return { emptyDuration: true };
  } else {
    return null;
  }
}
