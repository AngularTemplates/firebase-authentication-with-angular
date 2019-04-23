import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Constants {
  BEURL = 'https://nsp-milk.herokuapp.com/api/';
  CUSTOMER = 'customer';
  CUSTOMERS = 'customers';
  INVOICE = 'invoice/get_invoice';
}
