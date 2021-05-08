import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Period } from '../models/period.model';
import { ApiService } from './api.service';
import { AssetsinfoService } from './assetsinfo.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private assetInfo: AssetsinfoService, private api: ApiService) {
    this.initializeCryptoData();
  }

  private availableCryptos: any;

  getAvailableCryptos() {
    return this.availableCryptos;
  }

  getLastWeek(id: string, start: string, end: string) {
    //return this.assetInfo.getTimeData(id); //MOCK
    return this.api.getPeriod(id, '', start, end); //REAL
  }

  private initializeCryptoData() {
    let allCrypto = this.assetInfo.getAssets().filter(function (asset) {
      return asset.type_is_crypto == 1;
    });
    this.availableCryptos = allCrypto.filter(function (crypto) {
      return crypto.price_usd;
    });
  }
}
