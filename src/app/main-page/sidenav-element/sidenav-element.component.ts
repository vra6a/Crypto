import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Asset } from 'src/app/models/asset.model';
import { WebsocketInfo } from 'src/app/models/data.model';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-sidenav-element',
  templateUrl: './sidenav-element.component.html',
  styleUrls: ['./sidenav-element.component.css'],
})
export class SidenavElementComponent implements OnInit, OnDestroy {
  dataSubscription: Subscription = new Subscription();
  @Input() tab!: Asset;
  high: number = 0;
  low: number = 0;

  constructor(private wss: WebSocketService) {}

  ngOnInit(): void {
    this.dataSubscription = this.wss.dataUpdated.subscribe((data: string) => {
      this.handleData(JSON.parse(data));
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  handleData(data: Object) {
    let wsInfo = data as WebsocketInfo;
    if (wsInfo.type != 'error') {
      let symbolArray = wsInfo.symbol_id.split('_');
      console.log(symbolArray[2], wsInfo.price_high, wsInfo.price_low);
      if (symbolArray[2] == this.tab.asset_id) {
        this.high = wsInfo.price_high;
        this.low = wsInfo.price_low;
      }
    }
  }
}
