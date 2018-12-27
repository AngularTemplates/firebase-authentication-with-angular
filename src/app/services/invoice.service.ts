import { Injectable, Input } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ConfigService } from '../services/config.service';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  // invoiceList = [];
  sheetParams = {
    action: 'read',
    sheet_name: this._config.customerDetailsPage,
    page: this._config.paymentDetailsPage
  };
  constructor(private _http: HttpService, private _config: ConfigService) {
    this.getInvoiceList();
  }

  _invoiceList = [];
  get invoiceList() {
    console.log(JSON.parse(localStorage.invoiceList));
    return JSON.parse(localStorage.invoiceList) || this._invoiceList;
  }

  getInvoiceList() {
    return this._http.apiGet(this.sheetParams);
  }
  saveLocalStroage(data) {
    this._invoiceList = data;
    localStorage.invoiceList = JSON.stringify(this._invoiceList);
  }
  editInvoice(updateData) {
    this.sheetParams['action'] = 'update';
    console.log('update data', { ...updateData, ...this.sheetParams });
    return this._http.apiGet({ ...updateData, ...updateData });
  }
  supplierList() {
    const invoiceArr = this.getInvoiceArray(this.invoiceList);
    return [...new Set(invoiceArr.map(item => item.supplier))];
  }

  getInvoiceArray(invoiceObj) {
    const invoiceArray = [];
    for (const key in invoiceObj) {
      if (key) {
        invoiceArray.push(invoiceObj[key]);
      }
    }
    return invoiceArray;
  }
}
