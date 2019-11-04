import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class GamerService {
  private serviceUrl = 'games/gamer';
  private urls = {
      DELIVERY_ADDRESSES: `${environment.apiUrl}/${this.serviceUrl}/delivery-addresses`
  };

  constructor(private httpClient: HttpClient) {}

  public getDeliveryAddresses(): Observable<any> {
      return this.httpClient.get(this.urls.DELIVERY_ADDRESSES);
  }

  public addAddress(address: any) {
    return this.httpClient.post(this.urls.DELIVERY_ADDRESSES, address);
  }
}
