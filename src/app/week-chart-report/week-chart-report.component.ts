import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-chart-report',
  templateUrl: './week-chart-report.component.html',
  styleUrls: ['./week-chart-report.component.css']
})
export class WeekChartReportComponent implements OnInit {

  today:Date = new Date();
  title7ago:string = '';
  titleToday:string = '';
  sevenDays:number = 604800000;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  constructor() { }

  ngOnInit() {
    this.titleToday = 
      this.today.toLocaleDateString('es-US', this.options).toUpperCase();
    this.title7ago = 
      new Date((this.today.getTime() - this.sevenDays))
        .toLocaleDateString('es-US', this.options).toUpperCase();
  }

}
