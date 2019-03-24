import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as firebase from 'firebase';
import { DateService } from '../date.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})

export class ThirdPageComponent implements OnInit{

  surveyId:string = '';
  inputCollection:Promise<firebase.firestore.QuerySnapshot>;
  collection:string = 'userInput';
  countByHour:Array<any> = [];
  countByDay:Array<any> = [];
  selected:string = 'option2';
  today: Date;
  titleToday:any;
  titleToday7:Date;
  title7ago:any;
  titleMonth:any;

  /**Shared Line Chart Data Configuration*/
  public lineChartOptions:ChartOptions = {
    responsive: true,
    scales: { yAxes: [ {ticks: { beginAtZero: true }} ] } };
  public lineChartType:string = 'line';
  public lineChartLegend = true;
  /**Shared Line Chart Data Configuration*/
  public doughnutChartType:string = 'doughnut';
  public doughnutChartLabels:any[] = ['Malo','Regular','Bueno','Excelente'];

  public dailyLineChartData:Array<ChartDataSets> = [];
  public dailyLineChartLabels:Array<string> = [];

  public weeklyLineChartData:Array<ChartDataSets> = [];
  public weeklyLineChartLabels:Array<string> = [];

  public monthlyLineChartData:Array<ChartDataSets> = [];
  public monthlyLineChartLabels:Array<string> = [];

  public doughnutChartData:any[] = [];

 constructor(private route:ActivatedRoute, private dateSrv: DateService) {
   var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   this.route.queryParams.subscribe( param => {this.surveyId = param['id']} );
   this.inputCollection = firebase.firestore().collection(this.collection)
   .where('surveyID', '==', this.surveyId).get();
   this.today = new Date();
   let sevenD = this.today.getDate() - 7;
   this.titleToday = this.today.toLocaleDateString('es-US', options).toUpperCase();
   this.titleToday7 = new Date(this.today.getFullYear(), this.today.getMonth(), sevenD);
   this.title7ago = this.titleToday7.toLocaleDateString('es-US', options).toUpperCase();
   this.titleMonth = this.today.toLocaleDateString('es-US', {month: 'long'}).toUpperCase();
 }

 ngOnInit(){
  let documentDataByDay:Array<any> = [];
  let documentDataByWeek:Array<any> = [];
  let documentDataByMonth:Array<any> = [];

  let valueDayInput:any[] = [];
  let inputValue:any[] = [];

  this.inputCollection.then(querySnapShot => {

  this.dateSrv.getDataByDay(querySnapShot.docs, this.today).forEach(doc => {
    documentDataByDay.push(doc.created.toDate().getHours());
    valueDayInput = valueDayInput.concat(doc.input);
  });

  valueDayInput.forEach(inputObj => {inputValue.push(inputObj.value)});
  this.doughnutChartData.push(this.dateSrv.count(inputValue.sort((a, b) => {return a-b})));

  this.dateSrv.getDataByWeek(querySnapShot.docs, this.today).forEach(doc => {
    documentDataByWeek.push(doc.created.toDate().toLocaleDateString());
  });

  this.dateSrv.getDataByMonth(querySnapShot.docs, this.today).forEach(doc => {
    documentDataByMonth.push(doc.created.toDate().toLocaleDateString());
  });

  this.dailyLineChartData.push({data: this.dateSrv.count(documentDataByDay.sort()), 
    label: 'Encuestas Por Hora'});
  this.dailyLineChartLabels = documentDataByDay.sort()
  .filter((v,i) => documentDataByDay.indexOf(v) === i);

  this.weeklyLineChartData.push({data: this.dateSrv.count(documentDataByWeek.sort()), 
    label: 'Encuestas Por Día'});
  this.weeklyLineChartLabels = documentDataByWeek.sort().sort()
  .filter((v,i) => documentDataByWeek.indexOf(v) === i);

  this.monthlyLineChartData.push({data: this.dateSrv.count(documentDataByMonth.sort()), 
    label: 'Encuestas Por Mes'});
  this.monthlyLineChartLabels = documentDataByMonth.sort().sort()
  .filter((v,i) => documentDataByMonth.indexOf(v) === i);
  
   })
   .catch(err => {
     //TODO
   });
 }

 public captureScreen(param){
   if(this.selected === 'option1')
      var data = document.getElementById('dailyReport');
   if(this.selected === 'option2')
      var data = document.getElementById('weeklyReport');
   if(this.selected === 'option3')
      var data = document.getElementById('monthlyReport');
  html2canvas(data).then(canvas => {  
    // Few necessary setting options  
    var imgWidth = 208;   
    var pageHeight = 295;    
    var imgHeight = canvas.height * imgWidth / canvas.width;  
    var heightLeft = imgHeight;  

    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
    var position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    pdf.save(this.surveyId+'.pdf'); // Generated PDF   
  });
}

}
