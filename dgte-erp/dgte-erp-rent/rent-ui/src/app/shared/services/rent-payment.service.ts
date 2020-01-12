import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class RentPaymentService {
  private urls = {
      FIND_BY_LEASE_ID: `${environment.apiUrl}/findRentPaymentByLeaseId`,
      SAVE: `${environment.apiUrl}/saveRentPayment`,
  };

  constructor(private httpClient: HttpClient) {}

  public get(leaseId): Observable<any> {
      return this.httpClient.post(this.urls.FIND_BY_LEASE_ID, leaseId);
  }

  public save(rentPayment): Observable<any> {
      return this.httpClient.post(this.urls.SAVE, rentPayment);
  }

}
