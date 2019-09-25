import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
const moment = require('moment');

@Injectable()
export class LeaseService {
  private serviceUrl = 'rent';
  private urls = {
    FIND_ACTIVE_LEASE_BY_ROOM_CODE: `${environment.apiUrl}/${this.serviceUrl}/lease`
  };

  constructor(private httpClient: HttpClient) {
  }

  public findActiveLeaseByRoomCode(roomCode: string): Observable<any> {
    const params = {
      roomCode: roomCode
    };
    return this.httpClient.get(this.urls.FIND_ACTIVE_LEASE_BY_ROOM_CODE, { params: params });
  }

}
