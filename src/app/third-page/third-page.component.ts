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

  /**Line Chart Data Configuration */
  public lineChartOptions:ChartOptions = { responsive: true, beginAtZero: true };
  public lineChartData:Array<ChartDataSets> =  [{data:[8,3,9], label: 'Encuesta'}];
  public lineChartLabels:Array<string> = [];
  public lineChartType:string = 'line';
  public lineChartLegend = true;

  surveyId:string = '';
  inputCollection:Promise<firebase.firestore.QuerySnapshot>;
  collection:string = 'userInput';

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
  this.dateSrv.getDataByMonth(querySnapShot.docs, new Date());

  this.lineChartLabels = documentDataByWeek.sort();
   })
   .catch(err => {
     console.log(err);
   });
 }
}
