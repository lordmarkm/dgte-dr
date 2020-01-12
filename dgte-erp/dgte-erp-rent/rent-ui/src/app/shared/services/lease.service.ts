import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class LeaseService {
  private urls = {
      FIND_BY_APARTMENT_ID: `${environment.apiUrl}/findLeaseByApartmentId`
  };

  constructor(private httpClient: HttpClient) {}

  public getLeases(apartmentId): Observable<any> {
      return this.httpClient.post(this.urls.FIND_BY_APARTMENT_ID, apartmentId);
  }

}
