export class LoanDetails {
  amount: number;
  purpose: string;
  term: number;
  rate: number;
  addOnRate: number;
  grossSalary: number;
  monthlyAmmortization: number;
  borrowerTermsAndConditionsAccepted: boolean;
  borrowerDataPrivacyAccepted: boolean;
  borrowerAcceptedTimestamp: string;
  coMakerTermsAndConditionsAccepted: boolean;
  coMakerDataPrivacyAccepted: boolean;
  coMakerAcceptedTimestamp: string;
  referenceNumber: string;
  applicationCode: string;
  borrowerName: string;
  createdDate: string;
  verificationNumber: string;
}
