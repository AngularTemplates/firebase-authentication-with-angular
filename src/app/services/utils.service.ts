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
    this.snackBar.open(message, 'undo', {
      duration: 3000
    });
  }
}
