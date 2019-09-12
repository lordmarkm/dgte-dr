import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
const moment = require('moment');

@Injectable()
export class ProfitAndLossService {
  private serviceUrl = 'profit-and-loss';
  private urls = {
    FIND_BY_PROJECT_CODE_AND_DATE_RANGE: `${environment.apiUrl}/${this.serviceUrl}`,
  };

  constructor(private httpClient: HttpClient) {
  }

  public findByProjectCodeAndDateRange(projectCode: string, startDate: string, endDate: string, forceRecompute: boolean): Observable<any> {
    const params = {
      projectCode: projectCode,
      startDate: startDate,
      endDate: endDate,
      forceRecompute: forceRecompute ? 'true' : 'false'
    };
    return this.httpClient.get(this.urls.FIND_BY_PROJECT_CODE_AND_DATE_RANGE, { params: params });
  }

}
