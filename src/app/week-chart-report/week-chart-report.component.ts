import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { DateService } from 'src/seervices/date.service';
import * as firebase from 'firebase';
import { DataService } from 'src/seervices/data.service';
import * as CanvasJS from '../../assets/canvasjs.min.js';
import { ChartConfiguration } from 'src/assets/intarfaces/chart-configuration.interface.js';

export interface SatisfactionObject {
  worse: number,
  bad: number,
  ok: number,
  excelent: number
}

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
  sevenDays:number = 518400000;
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
  commentsCollection:string[] = [];

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
                "#E8EC14",
                "#49DC21",
                "#EE8713",
                "#F50000"       
                ]);

        if(this.questionsCollection[0].type != 'Abierta'){
          var chart0 = this.onCreateChart('chartContainer0', this.questionsCollection, this.inputCollection, 0);
        chart0.render();
        }else { this.commentsCollection = 
          this.dateSrv.countInputByQuestion(this.inputCollection, 0).filter((element) => {return element != ""});}

        if(this.questionsCollection[1].type != 'Abierta'){
          var chart1 = this.onCreateChart('chartContainer1', this.questionsCollection, this.inputCollection, 1);
        chart1.render();
        }else { this.commentsCollection = 
          this.dateSrv.countInputByQuestion(this.inputCollection, 1).filter((element) => {return element != ""});}
           
        if(this.questionsCollection[2].type != 'Abierta'){
          var chart2 = this.onCreateChart('chartContainer2', this.questionsCollection, this.inputCollection, 2);
        chart2.render();
        }else { this.commentsCollection = 
          this.dateSrv.countInputByQuestion(this.inputCollection, 2).filter((element) => {return element != ""});}
        
        if(this.questionsCollection[3].type != 'Abierta'){
          var chart3 = this.onCreateChart('chartContainer3', this.questionsCollection, this.inputCollection, 3);
        chart3.render();
        }else { this.commentsCollection = 
          this.dateSrv.countInputByQuestion(this.inputCollection, 3).filter((element) => {return element != ""});}
        
        if(this.questionsCollection[4].type != 'Abierta'){
          var chart4 = this.onCreateChart('chartContainer4', this.questionsCollection, this.inputCollection, 4);
        chart4.render();
        }else { this.commentsCollection = 
          this.dateSrv.countInputByQuestion(this.inputCollection, 4).filter((element) => {return element != ""});}
      
        if(this.questionsCollection[5].type != 'Abierta'){
          var chart5 = this.onCreateChart('chartContainer5', this.questionsCollection, this.inputCollection, 5);
        chart5.render();
        }else { this.commentsCollection = 
          this.dateSrv.countInputByQuestion(this.inputCollection, 5).filter((element) => {return element != ""});}
        
        
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

  private onCreateChart(chartElementId:string, qCollection:any[], iCollection:any[], questionNumber:number):CanvasJS.Chart{
    var configChart:ChartConfiguration;
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
                  dataPoints: this.setDataPointsSatisfaction(iCollection, questionNumber)
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
        dataPoints: this.setDataPoints(qCollection, iCollection, questionNumber)
        }]
      }
      break;
      case 'Abierta':
      return null;
    }
    
    return new CanvasJS.Chart(chartElementId, configChart)
  }

  private setDataPoints(labelsArray:any[], inputArray:any[], questionNumber:number):any[]{
    var dataPoints:any[] = [];
    for( let i =0; i < labelsArray[questionNumber].options.length; i++ ){
      dataPoints.push({
      y: this.getDataByQuestion(inputArray, questionNumber)[i] > 0 ? this.getDataByQuestion(inputArray, questionNumber)[i] : 0, 
      label:labelsArray[questionNumber].options[i] });
    }
    return dataPoints;
  }

  private setDataPointsSatisfaction(inputArray:any[], questionNumber:number):any[]{
    var satisfactionData:any = [];
    for(let i = 0; i < this.dateSrv.getSatisfactionLabels(this.dateSrv.countInputByQuestion(inputArray, 0).sort()).length; i++){
      satisfactionData.push(
        {
          y: this.dateSrv.count(this.dateSrv.countInputByQuestion(inputArray, 0).sort())[i],
          label: this.dateSrv.getSatisfactionLabels(this.dateSrv.countInputByQuestion(inputArray, 0).sort())[i]
        }
      )
    }
    return satisfactionData;
  }

  private getDataByQuestion(arrayContainer:any[], qNumber:number):any[] {
    var data:any[];
    data = this.dateSrv.count(this.dateSrv.countInputByQuestion(arrayContainer, qNumber).sort());
    return data;
  }


}
