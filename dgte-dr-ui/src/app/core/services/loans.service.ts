import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '@env/environment';
import { LoanDetails, LoanSearch, NewDataTableResp } from '@los/shared/models';
import { StoreService } from './store.service';


import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoansService {
  private serviceUrl = 'loans';
  private loanDetails: LoanDetails;
  private urls = {
    UPLOAD_ATTACHMENT: `${environment.apiUrl}/${this.serviceUrl}/attachments/upload`,
    SUBMIT_BORROWER_LOAN_APPLICATION: `${environment.apiUrl}/${this.serviceUrl}/loans`,
    SUBMIT_COMAKER_LOAN_APPLICATION: `${environment.apiUrl}/${this.serviceUrl}/loans/comaker-response`,
    GET_LOANS: `${environment.apiUrl}/${this.serviceUrl}/loans/loans`,
    UPDATE_LOANS_STATUS: `${environment.apiUrl}/${this.serviceUrl}/loans/update-loan-status`,
    ENDORSE_LOAN: `${environment.apiUrl}/${this.serviceUrl}/loans/endorsed`,
    ADD_NOTE: `${environment.apiUrl}/${this.serviceUrl}/loans/save-note`,
    BORROWER_VERIFICATION: `${environment.apiUrl}/${this.serviceUrl}/loans/borrower-verification`,
    GET_PROMISSORY_NOTE: `${environment.apiUrl}/${this.serviceUrl}/contract/promissory-note/pdf`,
    GET_AMORTIZATION_SCHEDULE: `${environment.apiUrl}/${this.serviceUrl}/contract/amortization-schedule/pdf`,
    GET_TERMS_AND_CONDITIONS: `${environment.apiUrl}/${this.serviceUrl}/contract/terms-and-conditions/pdf`,
  };

  constructor(private httpClient: HttpClient,
              private storeService: StoreService) {
    this.storeService.get('loanDetails').subscribe(loanDetails => {
      this.loanDetails = loanDetails;
    });
  }

  public uploadAttachment(type, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.set('type', type);
    formData.set('file', file);

    return this.httpClient.post(this.urls.UPLOAD_ATTACHMENT, formData);
  }

  public getAttachmentImage(localFileName, systemFileName) {
    return this.httpClient.get(`${environment.apiUrl}/${this.serviceUrl}/attachments/download/${localFileName}?systemFileName=${systemFileName}`, {
      responseType: 'blob'
    });
  }

  public submitBorrowerLoanApplication(params): Observable<any> {
    // sample for encoded request payload
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Clarify': 'true'
    //   })
    // };
    // return this.httpClient.post(this.urls.SUBMIT_BORROWER_LOAN_APPLICATION, { ...params}, httpOptions);
    return this.httpClient.post(this.urls.SUBMIT_BORROWER_LOAN_APPLICATION, { ...params});
  }

  public loginAsCoMaker(referenceNumber): Observable<any> {
    const valid = this.loanDetails.referenceNumber === referenceNumber ? true : false;
    return of({ valid });
  }

  getLoanDetailsWithCoMaker(referenceId, coMakerId) {
    return this.httpClient.get(`${environment.apiUrl}/${this.serviceUrl}/loans/${referenceId}/comaker/${coMakerId}`);
  }

  getLoanDetails(referenceId) {
    return this.httpClient.get(`${environment.apiUrl}/${this.serviceUrl}/loans/${referenceId}`);
  }

  public submitCoMakerLoanApplication(params): Observable<any> {
    // sample for encoded request payload
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Clarify': 'true'
    //   })
    // };

    // return this.httpClient.post(this.urls.SUBMIT_COMAKER_LOAN_APPLICATION, { ...params }, httpOptions);
    return this.httpClient.post(this.urls.SUBMIT_COMAKER_LOAN_APPLICATION, { ...params });
  }

  public getLoans(loanSearch: LoanSearch): Observable<NewDataTableResp> {
    return this.httpClient.get<NewDataTableResp>(`${environment.apiUrl}/${this.serviceUrl}/loans`,
      { params: loanSearch.toParams() });
  }

  public updateLoanStatus(loanReferenceNo: string, status: string, message: string, netPay: number): Observable<any> {
    return this.httpClient.post(`${this.urls.UPDATE_LOANS_STATUS}/${loanReferenceNo}/${status}`, { message, netPay });
  }

  public endorseLoan(loanReferenceNo: string, body: object): Observable<any> {
    return this.httpClient.post(`${this.urls.ENDORSE_LOAN}/${loanReferenceNo}`, body);
  }

  public addNote(referenceId: number, body: object): Observable<any> {
    return this.httpClient.post(`${this.urls.ADD_NOTE}/${referenceId}`, body);
  }

  public verifyBorrower(params): Observable<any> {
    return this.httpClient.post(this.urls.BORROWER_VERIFICATION, { ...params });
  }

  public generateOtp(referenceNumber): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/${this.serviceUrl}/loans/${referenceNumber}/otp-generate`, null);
  }

  public verifyOtp(referenceNumber, otpCode): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/${this.serviceUrl}/loans/${referenceNumber}/otp/${otpCode}/validate`, null);
  }

  public getPromissoryNote(): Observable<any> {
    return this.httpClient.get(`${this.urls.GET_PROMISSORY_NOTE}`);
  }

  public getAmortizationSchedule(referenceNumber): Observable<any> {
    return this.httpClient.get(`${this.urls.GET_AMORTIZATION_SCHEDULE}/${referenceNumber}`);
  }

  public getTermsAndConditions(): Observable<any> {
    return this.httpClient.get(`${this.urls.GET_TERMS_AND_CONDITIONS}`);
  }

  public acceptLoan(referenceNumber, params): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/${this.serviceUrl}/loans/${referenceNumber}/borrower-acceptance`, { ...params });
  }
}
