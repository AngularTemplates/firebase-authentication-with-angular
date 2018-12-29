import { Injectable } from '@angular/core';

import { ConfigService } from '../services/config.service';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  _invoiceList = [];
  invoiceArray = [];
  sheetParams = {
    action: 'read',
    sheet_name: this._config.customerDetailsPage,
    page: this._config.paymentDetailsPage
  };
  constructor(private _http: HttpService, private _config: ConfigService) {
    this.getInvoiceList();
  }

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

  getInvoiceArray(invoiceObj) {
    for (const key in invoiceObj) {
      if (key) {
        this.invoiceArray.push(invoiceObj[key]);
      }
    }
    return this.invoiceArray;
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

  getLinesDependOnSupplier(supplier = null) {
    supplier = 'vinoth';
    const supplierList = this.invoiceArray.filter(
      invoice => invoice.supplier === supplier
    );
    return [...new Set(supplierList.map(item => item.line_number))];
  }
}
