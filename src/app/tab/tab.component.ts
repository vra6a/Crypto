import { Component, Input, OnInit } from '@angular/core';
import { Asset } from '../models/asset.model';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {
  constructor() {}

  @Input() tab!: Asset;

  ngOnInit(): void {}
}
