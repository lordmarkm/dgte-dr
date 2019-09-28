export class AdminDetails {
  termsAndConditions: string;
  dataPrivacy: string;
  provinces: Province[];
  govIds: GovId[];
  loanPurposes: LoanPurpose[];
  placesOfBirth: City[];
  genders: Reference[];
  civilStatuses: Reference[];
  homeOwnerships: Reference[];
}

export class TextTemplate {
  template: string;
}

export class Province {
  id: number;
  countryCode: string;
  stateCode: string;
  stateName: string;
}

export class City {
  id: number;
  cityName: string;
  cityCode: string;
}

export class ZipCode {
  id: number;
  postalCode: string;
  description: string;
}

export class GovId {
  id: number;
  governmentId: string;
  new: boolean;
}

export class LoanPurpose {
  id: number;
  purpose: string;
  new: boolean;
}

export class Reference {
  code: string;
  description: string;
}
