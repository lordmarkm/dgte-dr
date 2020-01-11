import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProjectService {
  private serviceUrl = 'project';
  private urls = {
      FIND_ALL: `${environment.apiUrl}/findAllProjects`
  };

  constructor(private httpClient: HttpClient) {}

  public getProjects(params): Observable<any> {
      return this.httpClient.get(this.urls.FIND_ALL, { params: params });
  }

}
