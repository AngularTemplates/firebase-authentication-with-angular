import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ConfigService } from '../../services/config.service';
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
  displayedColumns: string[] = [
    'customer_name',
    'grand_total',
    'paid',
    'edit',
    'history'
  ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  dataSource = new MatTableDataSource();

  isLoading = false;

  supplierName = 'all';
  lineNumber = 'all';
  lineNumberList;
  suppliers;

  sheetParams = {
    action: 'read',
    sheet_name: this._config.customerDetailsPage,
    page: this._config.paymentDetailsPage
  };
  constructor(
    private _http: HttpService,
    private _utils: UtilsService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private _invoiceService: InvoiceService,
    private router: Router,
    private _config: ConfigService
  ) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/img/examples/thumbup-icon.svg'
      )
    );
  }
  ngOnInit() {
    this.isLoading = true;
    this._invoiceService.getInvoiceList().subscribe(data => {
      this._invoiceService.saveLocalStroage(data['records']);
      this._invoiceService.createInvoiceArray(data['records']);
      const invoiceArray = this._invoiceService.getInvoiceArray();
      if (this.supplierName === 'all' && this.lineNumber === 'all') {
        this.dataSource.data = invoiceArray;
      }
      this.supplierName = this.supplierName;
      this.lineNumber = this.lineNumber;
      this.suppliers = this._invoiceService.supplierList(this.supplierName);
      this.lineNumberList = this._invoiceService.getLinesDependOnSupplier(
        this.supplierName
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });

    console.log(this.dataSource);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updateAmount(amountValue: number, currentInvoice) {
    console.log(amountValue, currentInvoice);
    currentInvoice['paid_amount'] = amountValue;
    currentInvoice['sheet_name'] = this._config.paymentDetailsPage;
    currentInvoice['action'] = 'update';
    currentInvoice['due'] =
      currentInvoice['grand_total'] > amountValue
        ? currentInvoice['grand_total'] - amountValue
        : 0;
    currentInvoice['is_paid_status'] = true;
    console.log({ currentInvoice });
    // this._http.apiGet()
    this._http.apiGet(currentInvoice).subscribe(data => {
      console.log('Return data : ', data);
    });
  }
  editInvoice(customer_id) {
    this.router.navigate(['/edit-invoice', customer_id]);
  }
  changeSupplier(supplier) {
    console.log('supplier : ', supplier.value);
    this.supplierName = supplier.value;
    this.dataSource.data = this._invoiceService.getFilterData(
      this.supplierName,
      'all'
    );
    this.lineNumberList = this._invoiceService.getLinesDependOnSupplier(
      this.supplierName
    );
  }
  changeLine(lineNumber) {
    console.log('supplier : ', lineNumber.value);
    this.lineNumber = lineNumber.value;
    this.dataSource.data = this._invoiceService.getFilterData(
      this.supplierName,
      this.lineNumber
    );
  }
}
