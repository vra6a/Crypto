import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Asset } from '../models/asset.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { WebSocketService } from '../services/web-socket.service';
import { DialogboxComponent } from './dialogbox/dialogbox.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  currentUser!: User;
  tabs: Asset[] = [];
  availableCryptos: Asset[] = [];

  drawerIsOpen: boolean = false;
  dataSubscription = new Subscription();

  constructor(
    private data: DataService,
    public dialog: MatDialog,
    private wss: WebSocketService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.data.loadFinished) {
      this.availableCryptos = this.data.getAvailableCryptos();
    } else {
      this.dataSubscription = this.data.dataLoaded.subscribe(
        (data: Asset[]) => {
          this.availableCryptos = data;
        }
      );
    }

    this.currentUser = this.auth.getCurrentUser();
    if (this.currentUser) {
      this.tabs = this.currentUser.activeTabs;
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
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
        this.saveState();
      }
    });
  }

  deletePressed(toDelete: Asset) {
    this.tabs = this.tabs.filter((tab) => {
      return tab.asset_id != toDelete.asset_id;
    });
    this.socketChange();
    this.saveState();
  }

  socketChange() {
    if (this.wss.wsIsOpen) {
      let ids = this.tabs.map((tab) => tab.asset_id);
      this.wss.changeHello(ids);
    }
  }

  drawerChange() {
    this.drawerIsOpen = !this.drawerIsOpen;
    let ids = this.tabs.map((tab) => tab.asset_id);
    if (this.drawerIsOpen) {
      if (ids.length > 0) {
        if (!this.wss.wsIsOpen) {
          this.wss.OpenWebSocket(ids);
          this.wss.wsIsOpen = true;
        }
      }
    } else {
      if (this.wss.wsIsOpen) {
        this.wss.closeWebSocket();
        this.wss.wsIsOpen = false;
      }
    }
  }

  saveState() {
    if (this.currentUser) {
      this.currentUser.activeTabs = this.tabs;
      localStorage.setItem('loggedInUser', JSON.stringify(this.currentUser));
    }
  }

  logOutPressed() {
    this.auth.onLogOut();
  }
}
