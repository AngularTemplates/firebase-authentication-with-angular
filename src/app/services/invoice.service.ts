import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ConfigService } from '../services/config.service';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  invoiceList = [];
  sheetParams = {
    action: 'read',
    sheet_name: this._config.customerDetailsPage,
    page: this._config.paymentDetailsPage
  };
  constructor(private _http: HttpService, private _config: ConfigService) {
    this.getInvoiceList();
  }
  getInvoiceList() {
    return this._http.apiGet(this.sheetParams).subscribe(data => {
      // Object.keys(data['records'])
      const invoiceArray = [];
      for (const key in data['records']) {
        if (key) {
          invoiceArray.push(data['records'][key]);
        }
      }
      this.invoiceList = invoiceArray;
    });
  }
}
