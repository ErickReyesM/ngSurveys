import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})


export class ThirdPageComponent implements OnInit{

  @ViewChild('content') content: ElementRef;

  /*Bar Chart Data */
  public barChartDatasets = [
    {data: [654,321,98,654,21,87,654,322], label: 'Series A'},
    {data: [123,54,787,121,127,96,85,741], label: 'Series B'}
  ]
  public barChartLabels = ['2010','2011','2012','2013','2014','2015','2016','2017',];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }
  public barChartLegend = true;
  public barChartType = 'bar';

  /*Doughnut Chart Data */
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  /**Line Chart Data */
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor() { }

  ngOnInit(): void {}

  public onDownloadPDF(){
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    }

    let content = this.content.nativeElement;

    console.log(content.innerHTML);


    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('test.pdf');
  }

}
