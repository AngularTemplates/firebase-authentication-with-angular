import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}
  generateUUID() {
    return UUID.UUID();
  }
}
