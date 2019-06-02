import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '@env/environment';
import {
  Person
} from '@los/shared/models';

@Injectable()
export class PersonService {
  private urls = {
      GET_PEOPLE: `${environment.apiUrl}/person`,
  };

  constructor(private httpClient: HttpClient) { }

  public getPeople(params): Observable<Person> {
    return this.httpClient.get<Person>(this.urls.GET_PEOPLE, { params });
  }

}
