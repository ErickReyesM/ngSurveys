import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { DateService } from 'src/seervices/date.service';
import * as firebase from 'firebase';
import { DataService } from 'src/seervices/data.service';
import * as CanvasJS from '../../assets/canvasjs.min.js';
import { ChartConfiguration } from 'src/assets/intarfaces/chart-configuration.interface.js';

@Component({
  selector: 'app-today-chart-report',
  templateUrl: './today-chart-report.component.html',
  styleUrls: ['./today-chart-report.component.css']
})
export class TodayChartReportComponent implements OnInit {

  /**Line Chart Configuration*/
  public lineChartData: ChartData[] = [];
  public lineChartLabels: any[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  /**Global Variables*/
  today: Date = new Date();
  titleToday: string = '';
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  collectionInput: string = 'userInput';
  collectionSurveys: string = 'surveys';
  surveyId: string = '';
  surveyCreated: number[] = [];
  inputCollectionDaily: any[] = [];
  documents: any[] = [];
  inputType: string[] = [];
  questionsCollectionDaily: any[] = [];
  commentsCollection: string[] = [];
  themeInCharts:string = "light2";
  surveyTitle:string = '';
  dailyDataTable:any[] = [];

  constructor(private dateSrv: DateService, private dataSrv: DataService) {
    this.dataSrv.idOfTheSurvey.subscribe(identifier => this.surveyId = identifier);
  }

  ngOnInit() {

    this.titleToday =
    this.today.toLocaleDateString('es-US', this.options).toUpperCase();

    firebase.firestore().collection(this.collectionSurveys).doc(this.surveyId).get().then(
      (docSnapshot) => {

        this.surveyTitle = docSnapshot.data().surveyTitle;
        this.questionsCollectionDaily = docSnapshot.data().questions

        //Get Elements from firestore
        firebase.firestore().collection(this.collectionInput).where('surveyID', '==', this.surveyId).get().then(
          (querySnapShot) => {
            this.documents = this.dateSrv.getDataByDay(querySnapShot.docs, this.today)
            this.documents.forEach(
              (docFromFS) => {
                this.inputCollectionDaily.push(docFromFS.input);
                this.surveyCreated.push(docFromFS.created.toDate().getHours());
              });

            this.lineChartData.push(
              {
                data: this.dateSrv.count(this.surveyCreated.sort( (a,b) => {return a -b} )),
                label: 'Encuestas Por Hora'
              });

            this.lineChartLabels = 
            this.surveyCreated.sort( (a,b) => {return a -b} ).filter((v, i) => this.surveyCreated.indexOf(v) === i);


          CanvasJS.addColorSet("satisfaction",
            [//colorSet Array
              "#E8EC14",
              "#49DC21",
              "#EE8713",
              "#F50000"
            ]);

          if (this.questionsCollectionDaily[0].type != 'Abierta') {
            var chart0 = this.onCreateChart('dailyChartContainer0', this.questionsCollectionDaily, this.inputCollectionDaily, 0);
            chart0.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 0).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[1].type != 'Abierta') {
            var chart1 = this.onCreateChart('dailyChartContainer1', this.questionsCollectionDaily, this.inputCollectionDaily, 1);
            chart1.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 1).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[2].type != 'Abierta') {
            var chart2 = this.onCreateChart('dailyChartContainer2', this.questionsCollectionDaily, this.inputCollectionDaily, 2);
            chart2.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 2).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[3].type != 'Abierta') {
            var chart3 = this.onCreateChart('dailyChartContainer3', this.questionsCollectionDaily, this.inputCollectionDaily, 3);
            chart3.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 3).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[4].type != 'Abierta') {
            var chart4 = this.onCreateChart('dailyChartContainer4', this.questionsCollectionDaily, this.inputCollectionDaily, 4);
            chart4.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 4).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[5].type != 'Abierta') {
            var chart5 = this.onCreateChart('dailyChartContainer5', this.questionsCollectionDaily, this.inputCollectionDaily, 5);
            chart5.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 5).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[6].type != 'Abierta') {
            var chart6 = this.onCreateChart('dailyChartContainer6', this.questionsCollectionDaily, this.inputCollectionDaily, 6);
            chart6.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 6).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[7].type != 'Abierta') {
            var chart7 = this.onCreateChart('dailyChartContainer7', this.questionsCollectionDaily, this.inputCollectionDaily, 7);
            chart7.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 7).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[8].type != 'Abierta') {
            var chart8 = this.onCreateChart('dailyChartContainer8', this.questionsCollectionDaily, this.inputCollectionDaily, 8);
            chart8.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 8).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[9].type != 'Abierta') {
            var chart9 = this.onCreateChart('dailyChartContainer9', this.questionsCollectionDaily, this.inputCollectionDaily, 9);
            chart9.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 9).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[10].type != 'Abierta') {
            var chart10 = this.onCreateChart('dailyChartContainer10', this.questionsCollectionDaily, this.inputCollectionDaily, 10);
            chart10.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 10).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[11].type != 'Abierta') {
            var chart11 = this.onCreateChart('dailyChartContainer11', this.questionsCollectionDaily, this.inputCollectionDaily, 11);
            chart11.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 11).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[12].type != 'Abierta') {
            var chart12 = this.onCreateChart('dailyChartContainer12', this.questionsCollectionDaily, this.inputCollectionDaily, 12);
            chart12.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 12).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[13].type != 'Abierta') {
            var chart13 = this.onCreateChart('dailyChartContainer13', this.questionsCollectionDaily, this.inputCollectionDaily, 13);
            chart13.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 13).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[14].type != 'Abierta') {
            var chart14 = this.onCreateChart('dailyChartContainer14', this.questionsCollectionDaily, this.inputCollectionDaily, 14);
            chart14.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 14).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[15].type != 'Abierta') {
            var chart15 = this.onCreateChart('dailyChartContainer15', this.questionsCollectionDaily, this.inputCollectionDaily, 15);
            chart15.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 15).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[16].type != 'Abierta') {
            var chart16 = this.onCreateChart('dailyChartContainer16', this.questionsCollectionDaily, this.inputCollectionDaily, 16);
            chart16.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 16).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[17].type != 'Abierta') {
            var chart17 = this.onCreateChart('dailyChartContainer17', this.questionsCollectionDaily, this.inputCollectionDaily, 17);
            chart17.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 17).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[18].type != 'Abierta') {
            var chart18 = this.onCreateChart('dailyChartContainer18', this.questionsCollectionDaily, this.inputCollectionDaily, 18);
            chart18.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 18).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[19].type != 'Abierta') {
            var chart19 = this.onCreateChart('dailyChartContainer19', this.questionsCollectionDaily, this.inputCollectionDaily, 19);
            chart19.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 19).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[20].type != 'Abierta') {
            var chart20 = this.onCreateChart('dailyChartContainer20', this.questionsCollectionDaily, this.inputCollectionDaily, 20);
            chart20.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 20).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[21].type != 'Abierta') {
            var chart21 = this.onCreateChart('dailyChartContainer21', this.questionsCollectionDaily, this.inputCollectionDaily, 21);
            chart21.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 21).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[22].type != 'Abierta') {
            var chart22 = this.onCreateChart('dailyChartContainer22', this.questionsCollectionDaily, this.inputCollectionDaily, 22);
            chart22.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 22).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[23].type != 'Abierta') {
            var chart23 = this.onCreateChart('dailyChartContainer23', this.questionsCollectionDaily, this.inputCollectionDaily, 23);
            chart23.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 23).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[24].type != 'Abierta') {
            var chart24 = this.onCreateChart('dailyChartContainer24', this.questionsCollectionDaily, this.inputCollectionDaily, 24);
            chart24.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 24).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[25].type != 'Abierta') {
            var chart25 = this.onCreateChart('dailyChartContainer25', this.questionsCollectionDaily, this.inputCollectionDaily, 25);
            chart25.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 25).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[26].type != 'Abierta') {
            var chart26 = this.onCreateChart('dailyChartContainer26', this.questionsCollectionDaily, this.inputCollectionDaily, 26);
            chart26.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 26).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[27].type != 'Abierta') {
            var chart27 = this.onCreateChart('dailyChartContainer27', this.questionsCollectionDaily, this.inputCollectionDaily, 27);
            chart27.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 27).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[28].type != 'Abierta') {
            var chart28 = this.onCreateChart('dailyChartContainer28', this.questionsCollectionDaily, this.inputCollectionDaily, 28);
            chart28.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 28).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[29].type != 'Abierta') {
            var chart29 = this.onCreateChart('dailyChartContainer29', this.questionsCollectionDaily, this.inputCollectionDaily, 29);
            chart29.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 29).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[30].type != 'Abierta') {
            var chart30 = this.onCreateChart('dailyChartContainer30', this.questionsCollectionDaily, this.inputCollectionDaily, 30);
            chart30.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 30).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[31].type != 'Abierta') {
            var chart31 = this.onCreateChart('dailyChartContainer31', this.questionsCollectionDaily, this.inputCollectionDaily, 31);
            chart31.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 31).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[32].type != 'Abierta') {
            var chart32 = this.onCreateChart('dailyChartContainer32', this.questionsCollectionDaily, this.inputCollectionDaily, 32);
            chart32.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 32).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[33].type != 'Abierta') {
            var chart33 = this.onCreateChart('dailyChartContainer33', this.questionsCollectionDaily, this.inputCollectionDaily, 33);
            chart33.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 33).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[34].type != 'Abierta') {
            var chart34 = this.onCreateChart('dailyChartContainer34', this.questionsCollectionDaily, this.inputCollectionDaily, 34);
            chart34.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 34).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[35].type != 'Abierta') {
            var chart35 = this.onCreateChart('dailyChartContainer35', this.questionsCollectionDaily, this.inputCollectionDaily, 35);
            chart35.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 35).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[36].type != 'Abierta') {
            var chart36 = this.onCreateChart('dailyChartContainer36', this.questionsCollectionDaily, this.inputCollectionDaily, 36);
            chart36.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 36).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[37].type != 'Abierta') {
            var chart37 = this.onCreateChart('dailyChartContainer37', this.questionsCollectionDaily, this.inputCollectionDaily, 37);
            chart37.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 37).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[38].type != 'Abierta') {
            var chart38 = this.onCreateChart('dailyChartContainer38', this.questionsCollectionDaily, this.inputCollectionDaily, 38);
            chart38.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 38).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[39].type != 'Abierta') {
            var chart39 = this.onCreateChart('dailyChartContainer39', this.questionsCollectionDaily, this.inputCollectionDaily, 39);
            chart39.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 39).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[40].type != 'Abierta') {
            var chart40 = this.onCreateChart('dailyChartContainer40', this.questionsCollectionDaily, this.inputCollectionDaily, 40);
            chart40.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 40).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[41].type != 'Abierta') {
            var chart41 = this.onCreateChart('dailyChartContainer41', this.questionsCollectionDaily, this.inputCollectionDaily, 41);
            chart41.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 41).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[42].type != 'Abierta') {
            var chart42 = this.onCreateChart('dailyChartContainer42', this.questionsCollectionDaily, this.inputCollectionDaily, 42);
            chart42.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 42).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[43].type != 'Abierta') {
            var chart43 = this.onCreateChart('dailyChartContainer43', this.questionsCollectionDaily, this.inputCollectionDaily, 43);
            chart43.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 43).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[44].type != 'Abierta') {
            var chart44 = this.onCreateChart('dailyChartContainer44', this.questionsCollectionDaily, this.inputCollectionDaily, 44);
            chart44.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 44).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[45].type != 'Abierta') {
            var chart45 = this.onCreateChart('dailyChartContainer45', this.questionsCollectionDaily, this.inputCollectionDaily, 45);
            chart45.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 45).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[46].type != 'Abierta') {
            var chart46 = this.onCreateChart('dailyChartContainer46', this.questionsCollectionDaily, this.inputCollectionDaily, 46);
            chart46.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 46).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[47].type != 'Abierta') {
            var chart47 = this.onCreateChart('dailyChartContainer47', this.questionsCollectionDaily, this.inputCollectionDaily, 47);
            chart47.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 47).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[48].type != 'Abierta') {
            var chart48 = this.onCreateChart('dailyChartContainer48', this.questionsCollectionDaily, this.inputCollectionDaily, 48);
            chart48.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 48).filter((element) => { return element != "" });
          }

          if (this.questionsCollectionDaily[49].type != 'Abierta') {
            var chart49 = this.onCreateChart('dailyChartContainer49', this.questionsCollectionDaily, this.inputCollectionDaily, 49);
            chart49.render();
          } else {
            this.commentsCollection =
              this.dateSrv.countInputByQuestion(this.inputCollectionDaily, 49).filter((element) => { return element != "" });
          }


          //End of firebase method
        }
      ).catch(
        (err) => {
          //TODO 
        }
      );
    }
  ).catch(err => {
    //TODO
  });

  }

  private onCreateChart(chartElementId: string, qCollection: any[], iCollection: any[], questionNumber: number): CanvasJS.Chart {
    var configChart: ChartConfiguration;
    switch (qCollection[questionNumber].type) {
      case 'Satisfacción':
      case 'Elección':
        configChart = {
          colorSet: "satisfaction",
          animationEnabled: true,
          title: {
            text: this.questionsCollectionDaily[questionNumber].questionTxt,
            horizontalAlign: "left"
          },
          theme: this.themeInCharts,
          data: [{
            type: "doughnut",
            startAngle: 60,
            //innerRadius: 60,
            indexLabelFontSize: 30,
            indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y}",
            dataPoints: this.setDataPointsSatisfaction(iCollection, questionNumber)
          }]
        }
        break;
      case 'Opción Multitple':
        configChart = {
          animationEnabled: true,
          title: {
            text: this.questionsCollectionDaily[questionNumber].questionTxt,
            horizontalAlign: "left"
          },
          theme: this.themeInCharts,
          data: [{
            type: "doughnut",
            startAngle: 60,
            //innerRadius: 60,
            indexLabelFontSize: 30,
            indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y}",
            dataPoints: this.setDataPoints(qCollection, iCollection, questionNumber)
          }]
        }
        break;
      case 'Abierta':
        return null;
    }
    this.dailyDataTable.push(configChart.data[0].dataPoints);
    return new CanvasJS.Chart(chartElementId, configChart);
  }

  private setDataPoints(labelsArray: any[], inputArray: any[], questionNumber: number): any[] {
    var dataPoints: any[] = [];
    for (let i = 0; i < labelsArray[questionNumber].options.length; i++) {
      dataPoints.push({
        y: this.getDataByQuestion(inputArray, questionNumber)[i] > 0 ? this.getDataByQuestion(inputArray, questionNumber)[i] : 0,
        label: labelsArray[questionNumber].options[i]
      });
    }
    return dataPoints;
  }

  private setDataPointsSatisfaction(inputArray: any[], questionNumber: number): any[] {
    var satisfactionData: any = [];
    for (let i = 0; i < this.dateSrv.getSatisfactionLabels(this.dateSrv.countInputByQuestion(inputArray, questionNumber).sort()).length; i++) {
      satisfactionData.push(
        {
          y: this.dateSrv.count(this.dateSrv.countInputByQuestion(inputArray, questionNumber).sort())[i],
          label: this.dateSrv.getSatisfactionLabels(this.dateSrv.countInputByQuestion(inputArray, questionNumber).sort())[i]
        }
      )
    }
    return satisfactionData;
  }

  private getDataByQuestion(arrayContainer: any[], qNumber: number): any[] {
    var data: any[];
    data = this.dateSrv.count(this.dateSrv.countInputByQuestion(arrayContainer, qNumber).sort());
    return data;
  }
}
