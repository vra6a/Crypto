import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Asset } from '../models/asset.model';
import { DataService } from '../services/data.service';
import { WebSocketService } from '../services/web-socket.service';
import { DialogboxComponent } from './dialogbox/dialogbox.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  tabs: Asset[] = [];
  availableCryptos: Asset[] = [];

  drawerIsOpen: boolean = false;
  wsIsOpen: boolean = false;

  constructor(
    private data: DataService,
    public dialog: MatDialog,
    private wss: WebSocketService
  ) {}

  ngOnInit(): void {
    let cryptos = this.data.getAvailableCryptos();
    this.availableCryptos = cryptos;
  }

  onAdd() {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '650px',
      data: { cryptos: this.availableCryptos },
    });

    dialogRef.afterClosed().subscribe((result) => {
      let tmpAsset: Asset | undefined = this.availableCryptos.find(
        (c) => c.asset_id == result
      );
      if (tmpAsset) {
        this.tabs.push(tmpAsset);
        this.socketChange();
        console.log('onAdd', this.tabs);
      }
    });
  }

  deletePressed(toDelete: Asset) {
    this.tabs = this.tabs.filter((tab) => {
      return tab.asset_id != toDelete.asset_id;
    });
    this.socketChange();
  }

  socketChange() {
    if (this.wsIsOpen) {
      let ids = this.tabs.map((tab) => tab.asset_id);
      console.log('change sent', ids);
      this.wss.changeHello(ids);
    }
  }

  drawerChange() {
    this.drawerIsOpen = !this.drawerIsOpen;
    let ids = this.tabs.map((tab) => tab.asset_id);
    if (this.drawerIsOpen) {
      console.log(ids);
      if (ids.length > 0) {
        if (!this.wsIsOpen) {
          this.wss.OpenWebSocket(ids);
          this.wsIsOpen = true;
        }
      }
    } else {
      if (this.wsIsOpen) {
        this.wss.closeWebSocket();
        this.wsIsOpen = false;
      }
    }
  }
}
