import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-manual-update-customer-invoice',
  templateUrl: './manual-update-customer-invoice.component.html',
  styleUrls: ['./manual-update-customer-invoice.component.scss']
})
export class ManualUpdateCustomerInvoiceComponent implements OnInit {
  updateMonthlyAmountForm;
  customerId;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ManualUpdateCustomerInvoiceComponent>,
    private _invoiceService: InvoiceService
  ) {
    this.updateMonthlyAmountForm = new FormGroup({
      amount: new FormControl(''),
      mistake_reason: new FormControl('')
    });
  }

  ngOnInit() {
    this.customerId = this.data['customerId'];
  }
  onSubmit() {
    const customerInvoice = {};
    customerInvoice['customerDocId'] = this.customerId;
    customerInvoice['amount'] = -this.updateMonthlyAmountForm.value['amount'];
    customerInvoice['mistake_reason'] = this.updateMonthlyAmountForm.value[
      'mistake_reason'
    ];
    this._invoiceService.updateInvoice(customerInvoice).subscribe(res => {
      this.dialogRef.close(res);
    });
  }
}
