import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-line-number',
  templateUrl: './line-number.component.html',
  styleUrls: ['./line-number.component.scss']
})
export class LineNumberComponent implements OnInit {
  @Input() supplierInput: string;
  lineNumberList;
  constructor(
    private _fb: FormBuilder,
    private _invoiceService: InvoiceService
  ) {}
  lineNumbersForm: FormGroup;
  ngOnInit() {
    this.lineNumbersForm = this._fb.group({
      lineNumbers: new FormControl(null)
    });
    this.getSupplierNames();
  }
  getSupplierNames() {
    console.log(this.supplierInput);
    this.lineNumberList = this._invoiceService.getLinesDependOnSupplier(
      this.supplierInput
    );
  }
}
