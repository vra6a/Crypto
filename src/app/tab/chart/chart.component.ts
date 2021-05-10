import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Period } from 'src/app/models/period.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnDestroy {
  dataLoaded = false;
  data: { name: string; value: number }[] = [];

  @Input() id: string = '';

  colorScheme = {
    domain: ['#3F51B5'],
  };

  constructor(private dataService: DataService) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    ///MOCK
    /*
    this.data = this.dataService
      .getLastWeek(
        this.id,
        this.getStartDate(new Date()).toISOString(),
        new Date().toISOString()
      )
      .map((x) => {
        let date = x.time_period_start.split('T');
        return { name: date[0], value: x.price_close };
      });
    this.dataLoaded = true;
      */
    //REAL

    this.dataService
      .getLastWeek(
        this.id,
        this.getStartDate(new Date()).toISOString(),
        new Date().toISOString()
      )
      .subscribe((data) => {
        let rawData = data as Period[];
        this.data = rawData.map((x) => {
          let date = x.time_period_start.split('T');
          return { name: date[0], value: x.price_close };
        });
        this.dataLoaded = true;
      });
  }

  getStartDate(endDate: Date): Date {
    return new Date(Date.now() - 7 * 1000 * 60 * 60 * 24);
  }
}
