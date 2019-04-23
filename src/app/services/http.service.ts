import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Constants } from '../config';

@Injectable()
export class HttpService {
  _siteUrl;
  constructor(private _http: HttpClient, private _config: Constants) {
    this._siteUrl = this._config.BEURL;
  }
  getHttpHeaders = () => {
    return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }
  apiGet(url: string, needsAuth = false) {
    return this._http.get(`${this._siteUrl}${url}`);
  }
  apiPost(url: string, data: any, needsAuth = false) {
    return this._http.post(`${this._siteUrl}${url}`, data);
  }
  apiDelete(url: string, needsAuth = false) {
    return this._http.delete(`${this._siteUrl}${url}`);
  }
}
