import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  apiURL: string =
    'https://rest.coinapi.io/v1/ohlcv/BTC/USD/history?period_id=1DAY&time_start=2021-01-02T00:00:00&time_end=2021-01-09T00:00:00';
  myKey: string = 'X-CoinAPI-Key';
  myKeyValue: string = 'EBF61611-91F4-4FC0-9CF6-CE1F096D57F4';

  headers = new HttpHeaders().set(this.myKey, this.myKeyValue);

  getPeriod(id: string, currency: string, start: string, end: string) {
    currency = 'USD';
    let url =
      'https://rest.coinapi.io/v1/ohlcv/' +
      id +
      '/' +
      currency +
      '/history?period_id=1DAY&time_start=' +
      start +
      '&time_end=' +
      end;
    return this.http.get(url, { headers: this.headers });
  }

  getAssets() {
    return this.http.get('https://rest.coinapi.io/v1/assets', {
      headers: this.headers,
    });
  }
}
