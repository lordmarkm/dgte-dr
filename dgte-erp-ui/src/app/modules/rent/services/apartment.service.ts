import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
const moment = require('moment');

@Injectable()
export class ApartmentService {
  private serviceUrl = 'rent';
  private urls = {
    FIND_APARTMENT_BY_PROJECT_CODE: `${environment.apiUrl}/${this.serviceUrl}/apartment`,
    FIND_ROOMS_BY_PROJECT_CODE: `${environment.apiUrl}/${this.serviceUrl}/room`,
    SAVE_ROOM: `${environment.apiUrl}/${this.serviceUrl}/room`
  };

  constructor(private httpClient: HttpClient) {
  }

  public findByProjectCode(projectCode: string): Observable<any> {
    const params = {
      projectCode: projectCode
    };
    return this.httpClient.get(this.urls.FIND_APARTMENT_BY_PROJECT_CODE, { params: params });
  }

  public findRoomsByProjectCode(roomSearch): Observable<any> {
    return this.httpClient.get(this.urls.FIND_ROOMS_BY_PROJECT_CODE, { params: roomSearch });
  }

  public saveRoom(room): Observable<any> {
    return this.httpClient.post(this.urls.SAVE_ROOM, room);
  }

}
