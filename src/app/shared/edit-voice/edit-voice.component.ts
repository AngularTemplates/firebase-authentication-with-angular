import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    // grand_total	grand_total_text	paid_amount	due	extra	is_paid_status	comments
    this.editInvoiceForm = this.formBuilder.group({
      grand_total: [''],
      paid_amount: [''],
      due: [''],
      extra: [''],
      comments: ['']
    });

    this.route.params.subscribe(params => {
      this.invoiceId = params.invoiceid; // --> Name must match wanted parameter
      this.invoiceData = this._invoiceService.invoiceList[this.invoiceId];
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
      this._invoiceService
        .editInvoice({ ...this.invoiceData, ...this.editInvoiceForm.value })
        .subscribe(data => {
          console.log('edit call back', data);
        });
    }
  }
}
