import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

import { environment } from '@env/environment';

import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AccountService {
  private serviceUrl = 'account';
  private urls = {
    SEARCH: `${environment.apiUrl}/${this.serviceUrl}`,
    FIND_ROOT_BY_PROJECT_CODE: `${environment.apiUrl}/${this.serviceUrl}/find-root-by-project-code`,
    FIND_BY_CODE: `${environment.apiUrl}/${this.serviceUrl}/find-by-code`,
    SAVE: `${environment.apiUrl}/${this.serviceUrl}`,
  };

  constructor(private httpClient: HttpClient) {}

  public findRootByProjectCode(projectCode: string) {
      const params = {
        projectCode: projectCode
      }
      return this.httpClient.get(this.urls.FIND_ROOT_BY_PROJECT_CODE, { params: params });
  }

  public search(projectSearch): Observable<any> {
    return this.httpClient.get(this.urls.SEARCH, { params: projectSearch });
  }

  public findByCode(code: string) {
    return this.httpClient.get(this.urls.FIND_BY_CODE, { params: { code }});
  }

  public save(transaction): Observable<any> {
    return this.httpClient.post(this.urls.SAVE, transaction);
  }
}
