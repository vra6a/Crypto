import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor() {}

  WebSocket!: WebSocket;
  dataUpdated = new Subject<string>();

  OpenWebSocket(assets: string[]) /*:Subject<MessageEvent> */ {
    let hello = this.constructHello(assets);

    //creating the socket
    this.WebSocket = new WebSocket('ws://ws.coinapi.io/v1/');

    /*
    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      this.WebSocket.send(JSON.stringify(hello));
      this.WebSocket.onmessage = obs.next.bind(obs);
      this.WebSocket.onclose = obs.complete.bind(obs)
      return this.WebSocket.close.bind(this.WebSocket);
    });

    let observer = {
      next: (data: Object) => {
        if(this.WebSocket.readyState === this.WebSocket.OPEN) {
          this.WebSocket.send(JSON.stringify(data));
        }
      }
    }
    */

    this.WebSocket.onopen = (event) => {
      console.log('Open: ', event);
      this.WebSocket.send(JSON.stringify(hello));
    };

    this.WebSocket.onmessage = (event) => {
      this.dataUpdated.next(event.data);
    };

    this.WebSocket.onclose = (event) => {
      console.log('Close: ', event);
    };

    //return Subject.create(observer, observable);
  }

  closeWebSocket() {
    console.log('asd');
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
