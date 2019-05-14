import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Constants {
  BEURL = 'https://nsp-milk.herokuapp.com/api/';
  CUSTOMER = 'customer';
  CUSTOMERS = 'customers';
  INVOICE = 'invoice/';
  UPDATEINVOICE = 'update_invoice';
  SUPPLIERS = [
    { value: 'suresh', viewValue: 'suresh' },
    { value: 'vinoth', viewValue: 'vinoth' },
    { value: 'basker', viewValue: 'basker' }
  ];
}
