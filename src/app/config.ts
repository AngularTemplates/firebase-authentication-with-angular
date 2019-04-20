import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Constants {
  BEURL = 'localhost:3000/';
  CUSTOMER = 'api/customer';
  CUSTOMERS = 'api/customers';
  INVOICE = 'api/invoice';
}
