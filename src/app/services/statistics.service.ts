import { Injectable } from '@angular/core';

import { Constants } from '../config';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private _http: HttpService, private _config: Constants) {}
  getStatistics() {
    return this._http.apiGet(`${this._config.STATISTICS}`);
  }
}
