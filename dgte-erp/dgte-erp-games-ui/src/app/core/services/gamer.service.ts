import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class GamerService {
  private serviceUrl = 'games';
  private urls = {
      FRONT_PAGE_BUY: `${environment.apiUrl}/${this.serviceUrl}/public/game/buy`
  };

  constructor(private httpClient: HttpClient) {}

  public frontPageBuy(params): Observable<any> {
      return this.httpClient.get(this.urls.FRONT_PAGE_BUY, { params: params });
  }

}
