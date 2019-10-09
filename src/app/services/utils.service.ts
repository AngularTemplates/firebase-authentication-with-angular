import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(private snackBar: MatSnackBar) {}
  generateUUID() {
    return UUID.UUID();
  }
  openSnackBar(message) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }

  // [{id:1, name:'a'}, {id:2, name:'a'}] => ['1':{id:1, name:'a'}, '2':{id:2, name:'a'}]
  /*  */
  convertEntityData(invoiceArray) {
    return invoiceArray.reduce(function(obj, invoice) {
      obj[invoice.key] = invoice;
      return obj;
    }, {});
  }
}
