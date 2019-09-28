import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
const moment = require('moment');

@Injectable()
export class BalanceSheetService {
  private serviceUrl = 'balance-sheet';
  private entryUrl = 'entry';
  private urls = {
    FIND_BY_CODE_AND_AS_OF_DATE: `${environment.apiUrl}/${this.serviceUrl}`,
    FIND_COMPARATIVE_BY_CODE_AND_AS_OF_DATES: `${environment.apiUrl}/${this.serviceUrl}/comparative`,
  };

  constructor(private httpClient: HttpClient) {
  }

  public findByProjectCodeAndAsOfDate(projectCode: string, asOfDate: string): Observable<any> {
    const params = {
      projectCode: projectCode,
      asOfDate: asOfDate
    };
    return this.httpClient.get(this.urls.FIND_BY_CODE_AND_AS_OF_DATE, { params: params });
  }

  public findComparativeBalanceSheetByProjectCodeAndAsOfDates(projectCode: string, asOfDateA: string, asOfDateB: string): Observable<any> {
    const params = {
      projectCode: projectCode,
      asOfDateA: asOfDateA,
      asOfDateB: asOfDateB
    };
    return this.httpClient.get(this.urls.FIND_COMPARATIVE_BY_CODE_AND_AS_OF_DATES, { params: params });
  }

}
