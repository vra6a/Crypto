import { Component, Input, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/asset.model';

@Component({
  selector: 'app-sidenav-element',
  templateUrl: './sidenav-element.component.html',
  styleUrls: ['./sidenav-element.component.css'],
})
export class SidenavElementComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() tab!: Asset;
}
