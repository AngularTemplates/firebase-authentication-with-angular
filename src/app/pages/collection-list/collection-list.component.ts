import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UtilsService } from '../../services/utils.service';
@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {
  customerDetailsPage = 'paymentCustomerDetails';
  paymentDetailsPage = 'paymentDetails';
  collectionData = [];
  displayedColumns: string[] = [
    'customer_name',
    'total',
    'grant_total',
    'paid',
    'edit',
    'history'
  ];
  dataSource;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private http: HttpService, private _utils: UtilsService) {}
  ngOnInit() {
    this.collectionList();
  }

  collectionList() {
    // const sheetParams =
    //   'action=read&sheet_name=' +
    //   this.customerDetailsPage +
    //   '&page=' +
    //   this.paymentDetailsPage;
    const sheetParams = {
      action: 'read',
      sheet_name: this.customerDetailsPage,
      page: this.paymentDetailsPage
    };
    this.http.apiGet(sheetParams).subscribe(data => {
      this.collectionData = data['records'];
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.collectionData;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      console.log(this.dataSource);
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updateAmount(amountValue: number, currentPayment) {
    console.log(amountValue, currentPayment);
    currentPayment['payment_id'] = this._utils.generateUUID();
    currentPayment['paid'] = amountValue;
    currentPayment['is_paid'] = true;
    currentPayment['action'] = 'insert';
    currentPayment['sheet_name'] = this.paymentDetailsPage;
    console.log({ currentPayment });
    // this.http.apiGet()
    this.http.apiGet(currentPayment).subscribe(data => {
      console.log('Return data : ', data);
    });
  }
}
