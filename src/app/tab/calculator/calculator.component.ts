import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.from = this.id;
    this.output = this.usdPrice;
  }

  @Input() usdPrice: number = 0;
  @Input() id: string = '';

  from: string = '';
  to: string = 'USD';

  input: number = 1;
  output: number = this.usdPrice;
  swapped: boolean = false;

  onSwap() {
    let tmp = this.from;
    this.from = this.to;
    this.to = tmp;
    this.swapped = !this.swapped;
    this.recalculate();
  }

  onChange() {
    this.recalculate();
  }

  recalculate() {
    if (this.swapped) {
      this.output = this.input / this.usdPrice;
    } else {
      this.output = this.input * this.usdPrice;
    }
  }
}
