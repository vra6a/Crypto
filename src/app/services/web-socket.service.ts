import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor() {}

  WebSocket!: WebSocket;
  dataUpdated = new Subject<string>();
  wsIsOpen = false;

  OpenWebSocket(assets: string[]) {
    let hello = this.constructHello(assets);

    //creating the socket
    this.WebSocket = new WebSocket('ws://ws.coinapi.io/v1/');

    this.WebSocket.onopen = (event) => {
      this.wsIsOpen = true;
      this.WebSocket.send(JSON.stringify(hello));
    };

    this.WebSocket.onmessage = (event) => {
      this.dataUpdated.next(event.data);
    };

    this.WebSocket.onerror = (event) => {
      //TODO
    };

    this.WebSocket.onclose = (event) => {
      //TODO
      this.wsIsOpen = false;
    };
  }

  closeWebSocket() {
    this.WebSocket.close();
  }

  changeHello(asstes: string[]) {
    let hello = this.constructHello(asstes);
    this.WebSocket.send(JSON.stringify(hello));
  }

  private constructHello(assets: string[]): Object {
    //creating filter symbols with coinbase
    let filterSymbols = assets.map((asset) => {
      return 'COINBASE_SPOT_' + asset + '_USD$';
    });

    //cunstructing hello message for the socket
    let hello = {
      type: 'hello',
      apikey: 'EBF61611-91F4-4FC0-9CF6-CE1F096D57F4',
      heartbeat: false,
      subscribe_data_type: ['ohlcv'],
      subscribe_filter_symbol_id: filterSymbols,
      subscribe_filter_period_id: ['1MIN'],
    };
    return hello;
  }
}
