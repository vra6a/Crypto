import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Asset } from '../models/asset.model';
import { DataService } from '../services/data.service';
import { DialogboxComponent } from './dialogbox/dialogbox.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  constructor(private data: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    let cryptos = this.data.getAvailableCryptos();
    this.availableCryptos = cryptos;
  }

  tabs: Asset[] = [];
  availableCryptos: Asset[] = [];

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
      }
    });
  }

  deletePressed(toDelete: Asset) {
    this.tabs = this.tabs.filter((tab) => {
      return tab.asset_id != toDelete.asset_id;
    });
  }
}
