import { Injectable } from '@angular/core';
import { AssetsinfoService } from './assetsinfo.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private assetInfo: AssetsinfoService) {
    this.initializeCryptoData();
  }

  private availableCryptos: any;

  getAvailableCryptos() {
    return this.availableCryptos;
  }

  private initializeCryptoData() {
    let allCrypto = this.assetInfo.getAssets().filter(function (asset) {
      return asset.type_is_crypto == 1;
    });
    this.availableCryptos = allCrypto.filter(function (crypto) {
      return crypto.price_usd;
    });
    console.log(this.availableCryptos);
  }
}
