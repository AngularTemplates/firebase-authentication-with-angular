import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UtilsService } from '../../services/utils.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-collection-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  customerDetailsPage = 'paymentCustomerDetails';
  paymentDetailsPage = 'paymentDetails';
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

  isLoading = true;

  constructor(
    private _http: HttpService,
    private _utils: UtilsService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/img/examples/thumbup-icon.svg'
      )
    );
    this.invoiceList();
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
  }

  invoiceList() {
    const sheetParams = {
      action: 'read',
      sheet_name: this.customerDetailsPage,
      page: this.paymentDetailsPage
    };
    this._http.apiGet(sheetParams).subscribe(
      data => {
        // Object.keys(data['records'])
        const invoiceArray = [];
        for (const key in data['records']) {
          if (key) {
            invoiceArray.push(data['records'][key]);
          }
        }
        this.dataSource.data = invoiceArray;
        this.isLoading = false;
      },
      error => (this.isLoading = false)
    );
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
    currentInvoice['sheet_name'] = this.paymentDetailsPage;
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
}
