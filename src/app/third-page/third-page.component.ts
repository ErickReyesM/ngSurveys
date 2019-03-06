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

  /**Line Chart Data Configuration */
  public lineChartOptions:ChartOptions = {
    responsive: true,
    scales: { yAxes: [ {ticks: { beginAtZero: true }} ] } };
  public lineChartData:Array<ChartDataSets> = [];
  public lineChartLabels:Array<string> = [];
  public lineChartType:string = 'line';
  public lineChartLegend = true;

 constructor(private route:ActivatedRoute, private dateSrv: DateService) {
   this.route.queryParams.subscribe( param => {this.surveyId = param['id']} );
   this.inputCollection = firebase.firestore().collection(this.collection)
   .where('surveyID', '==', this.surveyId).get()
 }

 ngOnInit(){
  let documentDataByDay:Array<any> = [];
  let documentDataByWeek:Array<any> = [];
  let documentDataByMonth:Array<any> = [];

  this.inputCollection.then(querySnapShot => {

  this.dateSrv.getDataByDay(querySnapShot.docs, new Date());
  this.dateSrv.getDataByWeek(querySnapShot.docs, new Date()).forEach(doc => {
    documentDataByWeek.push(doc.created.toDate().toLocaleDateString());
  });
  
  this.dateSrv.getDataByWeek(querySnapShot.docs, new Date());
  this.countByDay = [1,2,3];
  this.lineChartData = [{ data: this.countByDay, label: 'Encuestas' }];
  this.lineChartLabels = documentDataByWeek.sort();

   })
   .catch(err => {
     console.log(err);
   });
 }
}
