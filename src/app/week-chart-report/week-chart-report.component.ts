import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { DateService } from 'src/seervices/date.service';
import * as firebase from 'firebase';
import { DataService } from 'src/seervices/data.service';

@Component({
  selector: 'app-week-chart-report',
  templateUrl: './week-chart-report.component.html',
  styleUrls: ['./week-chart-report.component.css']
})
export class WeekChartReportComponent implements OnInit {

  /**Line Chart Configuration*/
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: String[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: { yAxes: [ {ticks: { beginAtZero: true }} ] } };
  public lineChartLegend = true;
  public lineChartType:ChartType = 'line';

  /**Doughnut Chart Configuration*/
  public doughnutChartLabels: any[] = [];
  public doughnutChartData: ChartDataSets[] = [];
  public doughnutChartType: ChartType = 'doughnut';

  /**Global Variables*/
  today:Date = new Date();
  title7ago:string = '';
  titleToday:string = '';
  sevenDays:number = 604800000;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  collectionInput:string = 'userInput';
  collectionSurveys:string = 'surveys';
  surveyId:string = '';
  surveyCreated:string[] = [];
  inputCollection:any[] = [];
  documents:any[] = [];
  inputType:string[] = [];
  questionsCollection:any[] = [];
  satisfactionLabels:string[] = ['Pesimo', 'Regular', 'Bueno', 'Excelente'];
  doughnutLabelContainer:any[] = [];
  doughnutDataContainer:any[] = [];

  constructor(private dateSrv:DateService, private dataSrv:DataService) { 
    this.dataSrv.idOfTheSurvey.subscribe(identifier => this.surveyId = identifier);
  }

  ngOnInit() {

    this.titleToday = 
      this.today.toLocaleDateString('es-US', this.options).toUpperCase();
    this.title7ago = 
      new Date((this.today.getTime() - this.sevenDays))
        .toLocaleDateString('es-US', this.options).toUpperCase();
    
    firebase.firestore().collection(this.collectionSurveys).doc(this.surveyId).get().then(
      (docSnapshot) => {

        this.questionsCollection = docSnapshot.data().questions

//Get Elements from firestore
    firebase.firestore().collection(this.collectionInput).where('surveyID', '==', this.surveyId).get().then(
      (querySnapShot) => {
        this.documents = this.dateSrv.getDataByWeek(querySnapShot.docs, this.today)
        this.documents.forEach(
          (docFromFS) => {
            this.inputCollection.push(docFromFS.input);
            this.surveyCreated.push(docFromFS.created.toDate().toDateString());
          });

        this.lineChartData.push(
          {data: this.dateSrv.count( this.surveyCreated.sort( (a,b) => {
            return new Date(a).getTime() - new Date(b).getTime();
          } )), 
            label: 'Encuestas Por Día'
          });

        this.lineChartLabels = this.surveyCreated.sort( (a,b) => {
          return new Date(a).getTime() - new Date(b).getTime()
        }).filter((v,i) => this.surveyCreated.indexOf(v) === i);

        this.questionsCollection.forEach((question) => {
          if('Satisfacción' == question.type){
            this.doughnutLabelContainer.push(this.satisfactionLabels);
          }else if('Opción Multitple' == question.type || 'Elección' == question.type){
            this.doughnutLabelContainer.push(question.options)
          }
        });

        for(let i=0; i < this.questionsCollection.length; i++){
          this.doughnutDataContainer.push(this.dateSrv.count(this.dateSrv.countInputByQuestion(this.inputCollection, i).sort()));
        }
        
//End of firebase method
      }
    ).catch(
      (err) => { 
        //TODO 
      }
    );
      }
    ).catch(err=>{
      //TODO
    });
  }

}
