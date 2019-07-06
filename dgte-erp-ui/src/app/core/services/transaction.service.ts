import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '@env/environment';

import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class TransactionService {
  private serviceUrl = 'txn';
  private urls = {
    SEARCH: `${environment.apiUrl}/${this.serviceUrl}`,
    FIND_BY_CODE: `${environment.apiUrl}/${this.serviceUrl}/find-by-code`,
    SAVE: `${environment.apiUrl}/${this.serviceUrl}`,
  };

  constructor(private httpClient: HttpClient) {
  }

  public search(transactionSearch): Observable<any> {
    return this.httpClient.post(this.urls.SEARCH, transactionSearch);
  }

  public findByCode(code: string) {
    return this.httpClient.get(this.urls.FIND_BY_CODE, { code });
  }

  public save(transaction): Observable<any> {
    return this.httpClient.post(this.urls.SAVE, transaction);
  }
}
