import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor() {}

  WebSocket!: WebSocket;
  hello = JSON.stringify({
    type: 'hello',
    apikey: 'EBF61611-91F4-4FC0-9CF6-CE1F096D57F4',
    heartbeat: false,
    subscribe_data_type: ['ohlcv'],
    subscribe_filter_symbol_id: ['COINBASE_SPOT_LTC_USD$'],
    subscribe_filter_period_id: ['1MIN'],
  });

  OpenWebSocket() {
    this.WebSocket = new WebSocket('ws://ws.coinapi.io/v1/');

    this.WebSocket.onopen = (event) => {
      console.log('Open: ', event);
      this.WebSocket.send(this.hello);
    };

    this.WebSocket.onmessage = (event) => {
      console.log(event);
    };

    this.WebSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  send() {
    console.log('asd');
    this.WebSocket.close();
  }
}
