import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets , ChartOptions, ChartType } from 'chart.js';
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

  @ViewChild('questionContainer') questionContainer: ElementRef;

  surveyId:string = '';
  survey: Promise<firebase.firestore.DocumentSnapshot>;
  inputCollection:Promise<firebase.firestore.QuerySnapshot>;
  collectionInput:string = 'userInput';
  collectionSurveys:string = 'surveys';
  countByHour:Array<any> = [];
  countByDay:Array<any> = [];
  selected:string = 'option2';
  today: Date;
  titleToday:any;
  titleToday7:Date;
  title7ago:any;
  titleMonth:any;
  questions: Array<any> = [];
  questionCount:number = 0;
  questionInputCollection: Array<any> = [];
  valueDayInput:Array<any> = [];
  valueWeeklyInput:Array<any> = [];
  valueMonthlyInput:Array<any> = [];

  /**Shared Line Chart Data Configuration*/
  public lineChartOptions:ChartOptions = {
    responsive: true,
    scales: { yAxes: [ {ticks: { beginAtZero: true }} ] } };
  public lineChartType:ChartType = 'line';
  public lineChartLegend = true;
  /**Shared Line Chart Data Configuration*/
  public dailyLineChartData:Array<ChartDataSets > = [];
  public dailyLineChartLabels:Array<string> = [];

  public weeklyLineChartData:Array<ChartDataSets > = [];
  public weeklyLineChartLabels:Array<string> = [];

  public monthlyLineChartData:Array<ChartDataSets > = [];
  public monthlyLineChartLabels:Array<string> = [];

  /*Bar Chart Configuration*/
  public barChartOptions:ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ticks: {beginAtZero: true}}] },
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartLabels: Array<string> = ['Malo', 'Bueno', 'Excelente'];
  public barChartData: Array<ChartDataSets> = [];


 constructor(private route:ActivatedRoute, private dateSrv: DateService) {
   var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   this.route.queryParams.subscribe( param => {this.surveyId = param['id']} );
   this.inputCollection = firebase.firestore().collection(this.collectionInput)
   .where('surveyID', '==', this.surveyId).get();
   this.survey = firebase.firestore().collection(this.collectionSurveys).doc(this.surveyId).get();
   this.today = new Date();
   let sevenD = this.today.getDate() - 7;
   this.titleToday = this.today.toLocaleDateString('es-US', options).toUpperCase();
   this.titleToday7 = new Date(this.today.getFullYear(), this.today.getMonth(), sevenD);
   this.title7ago = this.titleToday7.toLocaleDateString('es-US', options).toUpperCase();
   this.titleMonth = this.today.toLocaleDateString('es-US', {month: 'long'}).toUpperCase();
   this.barChartData = [{data:[], label:''}];
 }

 ngOnInit(){
  let documentDataByDay:Array<any> = [];
  let documentDataByWeek:Array<any> = [];
  let documentDataByMonth:Array<any> = [];

  this.inputCollection.then(querySnapShot => {

  this.dateSrv.getDataByDay(querySnapShot.docs, this.today).forEach(doc => {
    documentDataByDay.push(doc.created.toDate().getHours());
    this.valueDayInput.push(doc.input);
  });

  this.dateSrv.getDataByWeek(querySnapShot.docs, this.today).forEach(doc => {
    documentDataByWeek.push(doc.created.toDate().toDateString());
    this.valueWeeklyInput.push(doc.input);
  });

  this.dateSrv.getDataByMonth(querySnapShot.docs, this.today).forEach(doc => {
    documentDataByMonth.push(doc.created.toDate().toDateString());
    this.valueMonthlyInput.push(doc.input);
  });

  this.dailyLineChartData.push({data: this.dateSrv.count(documentDataByDay.sort((a,b)=>{return a-b;})), 
    label: 'Encuestas Por Hora'});
  this.dailyLineChartLabels = documentDataByDay.sort((a,b)=>{return a-b;})
  .filter((v,i) => documentDataByDay.indexOf(v) === i);

  this.weeklyLineChartData.push({data: this.dateSrv.count( documentDataByWeek.sort( (a,b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  } )), 
    label: 'Encuestas Por Día'});
  this.weeklyLineChartLabels = documentDataByWeek.sort( (a,b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  } )
  .filter((v,i) => documentDataByWeek.indexOf(v) === i);

  this.monthlyLineChartData.push({data: this.dateSrv.count(documentDataByMonth.sort( (a,b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  } )), 
    label: 'Encuestas Por Mes'});
  this.monthlyLineChartLabels = documentDataByMonth.sort( (a,b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  } )
  .filter((v,i) => documentDataByMonth.indexOf(v) === i);

  this.survey.then((doc) => {
    for(let i=0; i < doc.data().questions.length; i++){
      this.questions.push(doc.data().questions[i].questionTxt);
    }
  });

  for(let i = 0; i < this.barChartData.length; i++){
    this.barChartData[i].data = this.dateSrv.count(this.countInputByQuestion(this.valueWeeklyInput, 0).sort());
    this.barChartData[i].label = 'Pregunta' + (i+1);
  }

  console.log(this.barChartData);
})
   .catch(err => {
     //TODO
   });
 }

 public captureScreen(){
   if(this.selected === 'option1')
      var data = document.getElementById('dailyReport');
   if(this.selected === 'option2')
      var data = document.getElementById('weeklyReport');
   if(this.selected === 'option3')
      var data = document.getElementById('monthlyReport');
  html2canvas(data).then(canvas => {  
    var questionC = document.getElementById('questionContainer');
    // Few necessary setting options  
    var imgWidth = 208;   
    var pageHeight = 295;    
    var imgHeight = canvas.height * imgWidth / canvas.width;  
    var heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
    var position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight) ;
    pdf.text(questionC.innerText, 15, 130); 
    pdf.save(this.surveyId+'.pdf'); // Generated PDF   
  });
}

/**
 * countInputByQuestion
 *
 */
public countInputByQuestion(questionCollection:any[], questionNumber:number):any[] {
  var valueInAnswer:Array<any> = [];
  for(let x = 0; x < questionCollection.length-1 ;x++){
    if(questionCollection[x][questionNumber].type !=  'Opción Multitple'){
      valueInAnswer.push(questionCollection[x][questionNumber].value);
    }
    else{ /*TODO*/ }
  }
  return valueInAnswer;
}

}