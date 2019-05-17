import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Constants } from '../../config';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-edit-voice',
  templateUrl: './edit-voice.component.html',
  styleUrls: ['./edit-voice.component.scss']
})
export class EditVoiceComponent implements OnInit {
  editInvoiceForm: FormGroup;
  submitted = false;
  invoiceId;
  invoiceData;
  suppliers = this._config.SUPPLIERS;
  payment_types = this._config.PAYMENT_TYPES;
  foods = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _invoiceService: InvoiceService,
    private _config: Constants
  ) {
    this.invoiceData = {
      '30days_amount': '',
      '31days_amount': '',
      customer_name: '',
      supplier: '',
      order: '',
      payment_type: '',
      milk_count: ''
    };
  }

  ngOnInit() {
    // grand_total	grand_total_text	paid_amount	due	extra	is_paid_status	comments
    this.editInvoiceForm = this.formBuilder.group({
      '30days_amount': [''],
      '31days_amount': [''],
      customer_name: [''],
      supplier: [''],
      order: [''],
      payment_type: [''],
      milk_count: ['']
    });

    this.route.params.subscribe(params => {
      this.invoiceId = params.id; // --> Name must match wanted parameter
      if (this.invoiceId === '0') {
        this.invoiceData = {
          '30days_amount': '',
          '31days_amount': '',
          customer_name: '',
          supplier: '',
          order: '',
          payment_type: '',
          milk_count: ''
        };
      } else {
        console.log('Imas');
        this._invoiceService
          .getInvoiceUsingId(this.invoiceId)
          .subscribe(data => {
            console.log('this : ', data);
            data['invoice'].payment = data['invoice'].payment.reverse();
            console.log(data);
            this.invoiceData = data;
          });
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editInvoiceForm.controls;
  }

  updateInvoice() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editInvoiceForm.valid) {
      const formData = this.editInvoiceForm.value;

      if (this.invoiceData['_id']) {
        this.invoiceData['30days_amount'] = formData['30days_amount']
          ? formData['30days_amount']
          : this.invoiceData['30days_amount'];
        this.invoiceData['31days_amount'] = formData['31days_amount']
          ? formData['31days_amount']
          : this.invoiceData['31days_amount'];
        this.invoiceData['customer_name'] = formData['customer_name']
          ? formData['customer_name']
          : this.invoiceData['customer_name'];
        this.invoiceData['order'] = formData['order']
          ? formData['order']
          : this.invoiceData['order'];
        this.invoiceData['supplier'] = formData['supplier']
          ? formData['supplier']
          : this.invoiceData['supplier'];
        this.invoiceData['payment_type'] = formData['payment_type']
          ? formData['payment_type']
          : this.invoiceData['payment_type'];
        this.invoiceData['milk_count'] = formData['milk_count']
          ? formData['milk_count']
          : this.invoiceData['milk_count'];
      } else {
        this.invoiceData['30days_amount'] = formData['30days_amount'];
        this.invoiceData['31days_amount'] = formData['31days_amount'];
        this.invoiceData['customer_name'] = formData['customer_name'];
        this.invoiceData['order'] = formData['order'];
        this.invoiceData['supplier'] = formData['supplier'];
        this.invoiceData['payment_type'] = formData['payment_type'];
        this.invoiceData['milk_count'] = formData['milk_count'];
      }
      this._invoiceService
        .createAndUpdateCustomer({ ...this.invoiceData })
        .subscribe(data => {
          console.log('edit call back', data);
        });
    }
  }
}
