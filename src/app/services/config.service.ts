import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  customerDetailsPage = 'paymentCustomerDetails';
  paymentDetailsPage = 'paymentDetails';
  constructor() {}
}
