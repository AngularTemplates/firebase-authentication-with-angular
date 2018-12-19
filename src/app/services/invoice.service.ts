import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private _http: HttpService) {}
  getInvoiceList(sheetParams) {
    return this._http.apiGet(sheetParams);
  }
}
