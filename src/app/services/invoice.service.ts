import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';

import { Constants } from '../config';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  _invoiceList;
  invoiceArray = [];
  sheetParams = {
    action: 'read',
    sheet_name: 'this._config.customerDetailsPage',
    page: 'this._config.paymentDetailsPage'
  };
  constructor(private _http: HttpService, private _confignew: Constants) {
    this.getInvoiceList();
  }

  get invoiceList() {
    console.log(JSON.parse(localStorage.invoiceList));
    return JSON.parse(localStorage.invoiceList) || this._invoiceList;
  }

  getInvoiceList() {
    this.invoiceArray = [];
    return this._http.apiGet(`${this._confignew.INVOICE}get_invoice`).pipe(
      map(invoice => {
        this._invoiceList = invoice;
        this.invoiceArray = this.createInvoiceArray(this._invoiceList);
        this.saveLocalStroage(this._invoiceList);
        return this.invoiceArray;
      })
    );
  }
  getInvoiceArray() {
    return this.invoiceArray;
  }
  saveLocalStroage(data) {
    this._invoiceList = data;
    localStorage.invoiceList = JSON.stringify(this._invoiceList);
  }

  createInvoiceArray(invoiceObj) {
    for (const key in invoiceObj) {
      if (key) {
        this.invoiceArray.push(invoiceObj[key]);
      }
    }
    this.invoiceArray = this.invoiceArray.sort((a, b) => {
      if (a.supplier === b.supplier) {
        // Price is only important when cities are the same
        return a.order > b.order ? 1 : b.order > a.order ? -1 : 0;
      }
      return a.supplier > b.supplier ? 1 : b.supplier > a.supplier ? -1 : 0;
    });
    console.log(this.invoiceArray);
    return this.invoiceArray;
  }

  editInvoice(updateData) {
    this.sheetParams['action'] = 'update';
    console.log('update data', { ...updateData, ...this.sheetParams });
    return this._http.apiGet({ ...updateData, ...updateData });
  }

  supplierList(supplier) {
    return ['all', ...new Set(this.invoiceArray.map(item => item.supplier))];
  }

  getLinesDependOnSupplier(supplier) {
    const supplierList = this.invoiceArray.filter(
      invoice => invoice.supplier === supplier
    );
    return ['all', , ...new Set(supplierList.map(item => item.line_number))];
  }

  getFilterData(supplier, lineNumber) {
    if (supplier === 'all') {
      return this.invoiceArray;
    } else {
      const supplierDependInvocieArray = this.invoiceArray.filter(
        item => item.supplier === supplier
      );
      if (lineNumber === 'all') {
        return supplierDependInvocieArray;
      } else {
        return supplierDependInvocieArray.filter(
          item => item.line_number === lineNumber
        );
      }
    }
  }

  // udpate invoice of the cus
  updateInvoice(customerInvoice) {
    return this._http.apiPost(
      `${this._confignew.INVOICE}${this._confignew.UPDATEINVOICE}`,
      customerInvoice
    );
  }
}
