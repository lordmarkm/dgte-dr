import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApartmentService {
  private urls = {
      FIND_BY_PROJECT_ID: `${environment.apiUrl}/findApartmentByProjectId`
  };

  constructor(private httpClient: HttpClient) {}

  public getApartments(projectId): Observable<any> {
      return this.httpClient.post(this.urls.FIND_BY_PROJECT_ID, projectId);
  }

}
