import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { DateService } from 'src/seervices/date.service';
import * as firebase from 'firebase';
import { DataService } from 'src/seervices/data.service';
import * as CanvasJS from '../../assets/canvasjs.min.js';

@Component({
  selector: 'app-week-chart-report',
  templateUrl: './week-chart-report.component.html',
  styleUrls: ['./week-chart-report.component.css']
})
export class WeekChartReportComponent implements OnInit {

  /**Line Chart Configuration*/
  public lineChartData: ChartData[] = [];
  public lineChartLabels: String[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: { yAxes: [ {ticks: { beginAtZero: true }} ] } };
  public lineChartLegend = true;
  public lineChartType:ChartType = 'line';

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

        CanvasJS.addColorSet("satisfaction",
                [//colorSet Array
                "#49DC21",
                "#E8EC14",
                "#EE8713",
                "#F50000"               
                ]);

        var chart0 = this.onCreateChart('chartContainer0',0, this.questionsCollection);
        chart0.render();
        var cahrt1 = this.onCreateChart('chartContainer1', 1, this.questionsCollection);
        cahrt1.render();
        var cahrt2 = this.onCreateChart('chartContainer2', 2, this.questionsCollection);
        cahrt2.render();
        var cahrt3 = this.onCreateChart('chartContainer3', 3, this.questionsCollection);
        cahrt3.render();
        var cahrt4 = this.onCreateChart('chartContainer4', 4, this.questionsCollection);
        cahrt4.render();
        var cahrt5 = this.onCreateChart('chartContainer5', 5, this.questionsCollection);
        cahrt5.render();
        
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

  private onCreateChart(chartId:string, questionNumber:number, qCollection:any[]):CanvasJS.Chart{
    var configChart = {}
    switch(qCollection[questionNumber].type){
      case 'Satisfacción': 
                configChart = {
                  colorSet: "satisfaction",
                  animationEnabled: true,
                  title:{
                    text: this.questionsCollection[questionNumber].questionTxt,
                    horizontalAlign: "left"
                  },
                  theme: "dark2",
                  data: [{
                    type: "doughnut",
                    startAngle: 60,
                    //innerRadius: 60,
                    indexLabelFontSize: 17,
                    indexLabel: "{label} - #percent%",
                    toolTipContent: "<b>{label}:</b> {y}",
                  dataPoints: [
                    { y: this.getDataByQuestion(this.inputCollection, questionNumber)[3], label: "Excelente" },
                    { y: this.getDataByQuestion(this.inputCollection, questionNumber)[2], label: "Bueno" },
                    { y: this.getDataByQuestion(this.inputCollection, questionNumber)[1], label: "Malo" },
                    { y: this.getDataByQuestion(this.inputCollection, questionNumber)[0], label: "Pesimo"}]
                  }]
                }
                break;
      case 'Opción Multitple':
      case 'Elección':
      configChart = {
        animationEnabled: true,
        title:{
          text: this.questionsCollection[questionNumber].questionTxt,
          horizontalAlign: "left"
        },
        theme: "dark2",
        data: [{
          type: "doughnut",
          startAngle: 60,
          //innerRadius: 60,
          indexLabelFontSize: 17,
          indexLabel: "{label} - #percent%",
          toolTipContent: "<b>{label}:</b> {y}",
        dataPoints: [
          { y: this.getDataByQuestion(this.inputCollection, questionNumber)[0], 
            label: this.getLabelsByQuestion(this.questionsCollection, questionNumber)[0] },
          { y: this.getDataByQuestion(this.inputCollection, questionNumber)[1], 
            label: this.getLabelsByQuestion(this.questionsCollection, questionNumber)[1] },
          ]
        }]
      }
      break;
      case 'Abierta':
      return null;
    }
    
    return new CanvasJS.Chart(chartId, configChart)
  }

  private getLabelsByQuestion(arrayContainer:any[], qNumber:number):string[] {
    var labels:any[];
    labels = arrayContainer[qNumber].options;
    return labels;
  }

  private getDataByQuestion(arrayContainer:any[], qNumber:number):any[] {
    var data:any[];
    data = this.dateSrv.count(this.dateSrv.countInputByQuestion(arrayContainer, qNumber).sort());
    return data;
  }

}
