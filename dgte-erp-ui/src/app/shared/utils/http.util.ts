import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpUtil {

  apiURL = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) {
  }

  post(url, body?, options?) {
    return this.httpClient.post(`${this.apiURL}${url}`, body, options);
  }

  put(url, body?, options?) {
    return this.httpClient.put(`${this.apiURL}${url}`, body, options);
  }

  get(url, options?) {
    return this.httpClient.get(`${this.apiURL}${url}`, options);
  }

  delete(url, options?) {
    return this.httpClient.delete(`${this.apiURL}${url}`, options)
  }
}
