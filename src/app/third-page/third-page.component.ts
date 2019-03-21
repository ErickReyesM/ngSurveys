import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as firebase from 'firebase';
import { DateService } from '../date.service';

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
  titleToday:string = '';
  titleToday7:string = '';
  titleMonth:string = '';

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
   this.titleToday = this.today.toLocaleDateString('es-US', options).toLocaleUpperCase();
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
  .filter((v,i) => documentDataByWeek.indexOf(v) === i);
  
   })
   .catch(err => {
     //TODO
   });
 }
}
