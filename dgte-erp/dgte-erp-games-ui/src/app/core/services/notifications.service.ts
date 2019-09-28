import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
const moment = require('moment');

@Injectable()
export class NotificationsService {
  private serviceUrl = 'notifications';

  private urls = {
    //transactions
    FIND_BY_PROJECT_CODE: `${environment.apiUrl}/${this.serviceUrl}/find-by-project-code`,
  };

  constructor(private httpClient: HttpClient) {
  }

  public findByProjectCode(projectCode: string) {
    return this.httpClient.get(this.urls.FIND_BY_PROJECT_CODE, { params: { projectCode }});
  }

}
