import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import input from '../data/input';

export interface InputType{
  type: string,
  value?: string
  options?: any[]
}

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})

export class ThirdPageComponent implements OnInit{

  inputCollection:{created:string, surveyId:string, input:InputType[]}[];

  @ViewChild('content') content: ElementRef;

  /*Bar Chart Data 
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

  /*Doughnut Chart Data*/
public doughnutChartLabels:string[] = [];
public doughnutChartData:number[] = [];
public doughnutChartType:string = 'doughnut';

public createdDate:any[] = [];
public lineChartData:Array<any> = [];
public lineChartLabels:Array<any> = [];
public lineChartOptions:any = {responsive: true};
public lineChartLegend:boolean = true;
public lineChartType:string = 'line';
public valueInputQ:Array<any> = [];
public valueInputLabels:Array<any> = [];
private unique:Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.inputCollection = input;
    //console.log(this.inputCollection);
    this.inputCollection.forEach(data =>{
      let sToD = data.created;
      let dateCreated = new Date(sToD);
      this.createdDate.push(dateCreated.getHours());
      data.input.forEach(input =>{
        this.valueInputQ.push(input.value);
      })
    });
    this.lineChartData = [
      {data: this.countByWeek(this.createdDate), label: 'Encuestas'}
    ];
     this.lineChartLabels = 
     ['8-9','9-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17','17-18','18-19','19-20'];
     let x = (names) => names.filter((v,i) => names.indexOf(v) === i);
     console.log(this.valueInputQ);
     this.doughnutChartData = this.countInputValue(this.valueInputQ);
     this.doughnutChartLabels = x(this.valueInputQ);
  }

  countInputValue(array_elements:any[]):any[] {
    let count:any[] = [];
    var current = null;
    var cnt = 1;
    array_elements.sort();
    for (var i = 0; i < array_elements.length; i++) {
      current = array_elements[i+1];
        if (array_elements[i] != current) {
          count.push(cnt);
          cnt = 1;
        } else {
            cnt++;
        }
      }
    return count;
}

  countByWeek(array_elements:any[]):any[] {
    let hours:Array<number> = array_elements.concat([8,9,10,11,12,13,14,15,16,17,18,19,20]);
    let count:any[] = [];
    var current = null;
    var cnt = 0;
    hours.sort((a, b) => a - b);
    for (var i = 0; i < hours.length; i++) {
      current = hours[i+1];
        if (hours[i] != current) {
          count.push(cnt);
          cnt = 0;
        } else {
            cnt++;
        }
      }
    return count;
}

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
