import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

import { environment } from '@env/environment';

import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProjectService {
  private serviceUrl = 'project';
  private urls = {
    SEARCH: `${environment.apiUrl}/${this.serviceUrl}`,
    FIND_BY_CODE: `${environment.apiUrl}/${this.serviceUrl}/find-by-code`,
    SAVE: `${environment.apiUrl}/${this.serviceUrl}`,
  };
  public selectedProject = new Subject();

  constructor(private httpClient: HttpClient) {
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
