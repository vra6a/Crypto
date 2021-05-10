import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Asset } from '../models/asset.model';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {
  @Input() tab!: Asset;
  @Output() onDeletePressed = new EventEmitter<Asset>();

  constructor() {}

  ngOnInit(): void {}

  onDelete() {
    this.onDeletePressed.emit(this.tab);
  }
}
