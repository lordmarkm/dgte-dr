import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Order } from '@games/shared/models';

@Injectable()
export class OrderService {
  private serviceUrl = 'games/order';
  private publicUrl = 'games/public/order';
  private urls = {
      BASE_URL: `${environment.apiUrl}/${this.serviceUrl}`,
      BASE_PUBLIC_URL: `${environment.apiUrl}/${this.publicUrl}`,
  };

  constructor(private httpClient: HttpClient) {}

  public getOrders(orderSearch: any): Observable<any> {
    return this.httpClient.get(this.urls.BASE_URL, { params: orderSearch });
  }

  public findOrderByCode(orderCode: string): Observable<Order> {
    return this.httpClient.get(this.urls.BASE_URL, { params: { 'orderCode': orderCode }});
  }

  public placeOrder(order: Order): Observable<any> {
      return this.httpClient.post(this.urls.BASE_PUBLIC_URL, order);
  }

}
