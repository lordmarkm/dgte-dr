import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { OAuthToken } from '@los/shared/models';

@Injectable()
export class AuthService {
  private serviceUrl = 'authentication';
  private urls = {
    GET_TOKEN: `${environment.apiUrl}/${this.serviceUrl}/oauth/token`,
    GET_USER_INFO: `${environment.apiUrl}/${this.serviceUrl}/user-info`,

    GET_USER_INFO_TEST: `${environment.apiUrl}/${this.serviceUrl}/user-info-test`,
    LOG_OUT: `${environment.apiUrl}/${this.serviceUrl}/logout`,
    CHANGE_PASSWORD: `${environment.apiUrl}/${this.serviceUrl}/change-password`
  };

  constructor(private httpClient: HttpClient) { }

  public connect(): Observable<OAuthToken> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('los:lossecret'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = {
      client_id: 'los',
      client_secret: 'lossecret',
      grant_type: 'password',
      username: 'los',
      password: '123qwe'
    };

    return this.httpClient.post<OAuthToken>(this.urls.GET_TOKEN, null, { headers, params });
  }

  public saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public login(username, password): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('los:lossecret'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const params = {
      client_id: 'los',
      client_secret: 'lossecret',
      grant_type: 'password',
      username: username,
      password: password
    };

    return this.httpClient.post<OAuthToken>(this.urls.GET_TOKEN, null, { headers, params });
  }

  public logout(): Observable<any> {
    return this.httpClient.post<OAuthToken>(this.urls.LOG_OUT, null);
  }

  public changePassword(username, currentPassword, newPassword): Observable<any> {
    const body = {
      username: username,
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    return this.httpClient.post<OAuthToken>(this.urls.CHANGE_PASSWORD, body);
  }

  public getUserInfo() {
    return this.httpClient.get<OAuthToken>(this.urls.GET_USER_INFO);
  }

  public getUserInfoTest() {
    return this.httpClient.get<OAuthToken>(this.urls.GET_USER_INFO_TEST);
  }
}
