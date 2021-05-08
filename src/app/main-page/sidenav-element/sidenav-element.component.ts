import { Component, Input, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/asset.model';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-sidenav-element',
  templateUrl: './sidenav-element.component.html',
  styleUrls: ['./sidenav-element.component.css'],
})
export class SidenavElementComponent implements OnInit {
  constructor(private wss: WebSocketService) {}

  ngOnInit(): void {}

  @Input() tab!: Asset;

  openWebSocket() {
    this.wss.OpenWebSocket();
  }

  send() {
    this.wss.send();
  }
}
