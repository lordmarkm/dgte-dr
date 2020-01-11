import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class GameService {
  private serviceUrl = 'project';
  private urls = {
      MAIN: `${environment.apiUrl}/${this.serviceUrl}`
  };

  constructor(private httpClient: HttpClient) {}

  public getProjects(params): Observable<any> {
      return this.httpClient.get(this.urls.MAIN, { params: params });
  }

}
