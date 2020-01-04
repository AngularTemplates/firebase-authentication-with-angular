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
  UPDATEEXTRAANDMINUSAMOUNT = '/extra-and-minus-milk';
  STATISTICS = 'statistics';
  SUPPLIERS = [
    { value: 'suresh', viewValue: 'suresh' },
    { value: 'vinoth', viewValue: 'vinoth' },
    { value: 'baskar', viewValue: 'baskar' }
  ];
  PAYMENT_TYPES = [
    { value: 'PM', viewValue: 'PM' },
    { value: 'LM', viewValue: 'PM' }
  ];

  LINES = [
    { value: 'line1', viewValue: 'line1' },
    { value: 'line2', viewValue: 'line2' },
    { value: 'krishna nagar', viewValue: 'krishna nagar' },
    { value: 'church line', viewValue: 'church line' }
  ];
}
