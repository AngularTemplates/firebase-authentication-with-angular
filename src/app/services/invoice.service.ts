import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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
    return this._http.apiGet(this.sheetParams).pipe(
      map(invoice => {
        this._invoiceList = invoice['records'];
        this.invoiceArray = this.createInvoiceArray(this._invoiceList);
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
    return this.invoiceArray;
  }

  editInvoice(updateData) {
    this.sheetParams['action'] = 'update';
    console.log('update data', { ...updateData, ...this.sheetParams });
    return this._http.apiGet({ ...updateData, ...updateData });
  }

  supplierList(supplier) {
    if (supplier === 'all') {
      return ['all', ...new Set(this.invoiceArray.map(item => item.supplier))];
    } else {
      return [...new Set(this.invoiceArray.map(item => item.supplier))];
    }
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
}
