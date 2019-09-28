import {
  CompanyLoanSettings,
  LoanDetails,
  EmploymentDetails,
  PersonalDetails,
  CompleteAddress,
  UploadDocumentAttachmentsDetails,
  AdminDetails,
  AdminUserInfo,
  Company,
  CompleteLoanDetails,
} from '@los/shared/models';


export class AppState {
  companyLoanSettings: CompanyLoanSettings;
  loanDetails: LoanDetails;
  completeLoanDetails: CompleteLoanDetails;
  borrowerEmploymentDetails: EmploymentDetails;
  coMakerEmploymentDetails: EmploymentDetails;
  borrowerPersonalDetails: PersonalDetails;
  coMakerPersonalDetails: PersonalDetails;
  borrowerCompleteAddress: CompleteAddress;
  coMakerCompleteAddress: CompleteAddress;
  uploadDocumentAttachmentsDetails: UploadDocumentAttachmentsDetails;
  adminDetails: AdminDetails;
  adminUserInfo: AdminUserInfo;
  selectedCompany: Company;
}
