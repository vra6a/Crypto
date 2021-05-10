import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Subject } from 'rxjs';
import { Asset } from '../models/asset.model';
import { ApiService } from './api.service';
import { AssetsinfoService } from './assetsinfo.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private assetInfo: AssetsinfoService, private api: ApiService) {
    this.initializeCryptoData();
  }

  private availableCryptos: Asset[] = [];
  dataLoaded = new Subject<Asset[]>();
  loadFinished = false;

  getAvailableCryptos() {
    return this.availableCryptos;
  }

  getLastWeek(id: string, start: string, end: string) {
    //return this.assetInfo.getTimeData(id); //MOCK
    return this.api.getPeriod(id, '', start, end); //REAL
  }

  private initializeCryptoData() {
    this.loadFinished = false;
    this.api.getAssets().subscribe((httpData) => {
      let allCrypto = (httpData as Asset[]).filter(function (asset) {
        return asset.type_is_crypto == 1;
      });
      this.availableCryptos = allCrypto.filter(function (crypto) {
        return crypto.price_usd;
      });
      this.loadFinished = true;
      this.dataLoaded.next(this.availableCryptos);
    });
    /*
    let allCrypto = this.assetInfo.getAssets().filter(function (asset) {
      return asset.type_is_crypto == 1;
    });
    this.availableCryptos = allCrypto.filter(function (crypto) {
      return crypto.price_usd;
    });
    */
  }
}
