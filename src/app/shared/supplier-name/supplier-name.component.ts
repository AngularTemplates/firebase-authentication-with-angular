import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-supplier-name',
  templateUrl: './supplier-name.component.html',
  styleUrls: ['./supplier-name.component.scss']
})
export class SupplierNameComponent implements OnInit {
  suppliers;
  selectedSupplier = 'vinoth';
  constructor(
    private _fb: FormBuilder,
    private _invoiceService: InvoiceService
  ) {}
  supplierForm: FormGroup;
  ngOnInit() {
    this.supplierForm = this._fb.group({
      supplierName: new FormControl(null)
    });
    this.getSupplierNames();
  }
  getSupplierNames() {
    console.log(this._invoiceService.supplierList());
    this.suppliers = this._invoiceService.supplierList();
  }
}
