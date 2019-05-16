import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { HttpService } from '../../services/http.service';
import { InvoiceService } from '../../services/invoice.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  collectionData = [];
  currentInvoiceList = [];
  displayedColumns: string[] = ['customer_name', 'total', 'pay'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  dataSource = new MatTableDataSource();

  isLoading = false;

  supplierName;
  lineNumber;
  disableLineNumber = false;
  lineNumberList;
  suppliers;

  constructor(
    private _http: HttpService,
    private _utils: UtilsService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private _invoiceService: InvoiceService,
    private router: Router
  ) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/img/examples/thumbup-icon.svg'
      )
    );
  }
  ngOnInit() {
    this.getInvoice();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updateAmount(amountValue: number, customer) {
    const customerInvoice = {};
    customerInvoice['amount'] = -amountValue;
    customerInvoice['customerDocId'] = customer['_id'];
    this._invoiceService.updateInvoice(customerInvoice).subscribe(res => {
      this.getInvoice();
    });
  }
  editInvoice(customer_id) {
    this.router.navigate(['/edit-invoice', customer_id]);
  }
  changeSupplier(supplier) {
    this.supplierName = supplier.value;
    localStorage.supplierName = JSON.stringify(this.supplierName);
    this.disableLineNumber = false;
    if (this.supplierName === 'all') {
      this.disableLineNumber = true;
    }
    this.dataSource.data = this._invoiceService.getFilterData(
      this.supplierName,
      'all'
    );
    this.lineNumberList = this._invoiceService.getLinesDependOnSupplier(
      this.supplierName
    );
    this.currentInvoiceList = this.dataSource.data;
  }
  changeLine(lineNumber) {
    this.lineNumber = lineNumber.value;
    localStorage.lineNumber = JSON.stringify(this.lineNumber);
    this.dataSource.data = this._invoiceService.getFilterData(
      this.supplierName,
      this.lineNumber
    );
    this.currentInvoiceList = this.dataSource.data;
  }

  getInvoice() {
    this.isLoading = true;
    this._invoiceService.getInvoiceList().subscribe(data => {
      this.supplierName = localStorage.supplierName
        ? JSON.parse(localStorage.supplierName)
        : 'all';
      if (this.supplierName === 'all') {
        this.disableLineNumber = true;
      }
      this.lineNumber = localStorage.lineNumber
        ? JSON.parse(localStorage.lineNumber)
        : 'all';
      this.suppliers = this._invoiceService.supplierList(this.supplierName);
      this.lineNumberList = this._invoiceService.getLinesDependOnSupplier(
        this.supplierName
      );
      if (this.supplierName === 'all' && this.lineNumber === 'all') {
        this.dataSource.data = data;
      } else {
        this.dataSource.data = this._invoiceService.getFilterData(
          this.supplierName,
          this.lineNumber
        );
      }
      this.currentInvoiceList = this.dataSource.data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  filterNotPaidCustomer(isPaid) {
    if (isPaid.checked) {
      this.dataSource.data = this.currentInvoiceList.filter(
        customer =>
          (customer.invoice ? customer.invoice.payment[0].amount : 0) > 0
      );
    } else {
      this.dataSource.data = this.currentInvoiceList;
    }
  }
}
