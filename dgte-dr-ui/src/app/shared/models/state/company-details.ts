export class CompanyLoanSettings {
  version: number;
  id: number;
  company: Company;
  rate: number;
  minimumLoanAmount: number;
  maximumLoanAmount: number;
  itrRequired: boolean;
  coeRequired: boolean;
  creditInsuranceFormsRequired: boolean;
  companyIdRequired: boolean;
  govtIdRequired: boolean;
  payslipRequired: boolean;
  verificationRequired: boolean;
  gmiToMlaComputation: GmiComputation[];
  endorserRoles: EndorserRole[];
  terms: number[];
  loanPurposes: string[];
  minimumTenureRankAndFile: number;
  minimumTenureOfficer: number;
  minimumTenure: number;
  requiredDocumentation: string[];
  termsAndConditions: string[];
  dataPrivacy: string[];
  noComakerTenure: number;
}

export class Company {
  version: number;
  id: number;
  code: string;
  name: string;
  jgSubsidiary: boolean;
  companyUrl: string;
}

export class GmiComputation {
  minGmi: number;
  maxGmi: number;
  multiplier: number;
}

export class EndorserRole {
  code: string;
  description: string;
}
