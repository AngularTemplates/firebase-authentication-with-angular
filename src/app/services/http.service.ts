import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable } from "rxjs";
@Injectable()
export class HttpService {
  apiUrl =
    'https://script.google.com/macros/s/AKfycbyjtV76UmxnDR2Y3uVrpyvTADFhC2aukmUuWzRpwNPyi--sIwc/exec?';
  constructor(private http: HttpClient) {}
  getHttpHeaders = () => {
    return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }
  apiGet(params) {
    const parameter = new HttpParams({
      fromObject: params
    });
    console.log(this.apiUrl + '?' + parameter);
    return this.http.get(this.apiUrl, { params: parameter });
  }
}
