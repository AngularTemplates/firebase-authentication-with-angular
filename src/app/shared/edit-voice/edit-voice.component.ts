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
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _invoiceService: InvoiceService,
    private _config: Constants
  ) {}

  ngOnInit() {
    // grand_total	grand_total_text	paid_amount	due	extra	is_paid_status	comments
    this.editInvoiceForm = this.formBuilder.group({
      '30days_amount': [''],
      '31days_amount': [''],
      customer_name: [''],
      supplier: [''],
      order: ['']
    });

    this.route.params.subscribe(params => {
      this.invoiceId = params.id; // --> Name must match wanted parameter
      if (this.invoiceId === 0) {
        this.invoiceData = {
          '30days_amount': 'a',
          '31days_amount': 'a',
          customer_name: 'a',
          supplier: 'a',
          order: 'a'
        };
      } else {
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
      console.log(this.editInvoiceForm.value);
      // this._invoiceService
      //   .editInvoice({ ...this.invoiceData, ...this.editInvoiceForm.value })
      //   .subscribe(data => {
      //     console.log('edit call back', data);
      //   });
    }
  }
}
