import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { DateService } from 'src/seervices/date.service';
import * as firebase from 'firebase';
import { DataService } from 'src/seervices/data.service';
import * as CanvasJS from '../../assets/canvasjs.min.js';
import { ChartConfiguration } from 'src/assets/intarfaces/chart-configuration.interface.js';

@Component({
  selector: 'app-month-chart-report',
  templateUrl: './month-chart-report.component.html',
  styleUrls: ['./month-chart-report.component.css']
})
export class MonthChartReportComponent implements OnInit {

  /**Line Chart Configuration*/
  public lineChartData: ChartData[] = [];
  public lineChartLabels: String[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  /**Global Variables*/
  today: Date = new Date();
  titleMonth: string = '';
  options = { month: 'long'};
  collectionInput: string = 'userInput';
  collectionSurveys: string = 'surveys';
  surveyId: string = '';
  surveyCreated: string[] = [];
  inputCollectionMonthly: any[] = [];
  documents: any[] = [];
  inputType: string[] = [];
  questionsCollectionMonthly: any[] = [];
  doughnutLabelContainer: any[] = [];
  doughnutDataContainer: any[] = [];
  commentsCollection: string[] = [];
  themeInCharts:string = "light2";
  surveyTitle:string = '';
  surveyDescription:string = '';
  monthlyDataTable:any[] = [];

  constructor(private dateSrv: DateService, private dataSrv: DataService) {
    this.dataSrv.idOfTheSurvey.subscribe(identifier => this.surveyId = identifier);
  }

  ngOnInit() {

    this.titleMonth =
      this.today.toLocaleDateString('es-US', this.options).toUpperCase();

      firebase.firestore().collection(this.collectionSurveys).doc(this.surveyId).get().then(
        (docSnapshot) => {
  
          this.surveyTitle = docSnapshot.data().surveyTitle;
          this.surveyDescription = docSnapshot.data().surveyDescription;
          this.questionsCollectionMonthly = docSnapshot.data().questions
  
          //Get Elements from firestore
          firebase.firestore().collection(this.collectionInput).where('surveyID', '==', this.surveyId).get().then(
            (querySnapShot) => {
              this.documents = this.dateSrv.getDataByMonth(querySnapShot.docs, this.today)
              this.documents.forEach(
                (docFromFS) => {
                  this.inputCollectionMonthly.push(docFromFS.input);
                  this.surveyCreated.push(docFromFS.created.toDate().toDateString());
                });
  
              this.lineChartData.push(
                {
                  data: this.dateSrv.count(this.surveyCreated.sort((a, b) => {
                    return new Date(a).getTime() - new Date(b).getTime();
                  })),
                  label: 'Encuestas Por Día'
                });
  
                var labels = this.surveyCreated.sort((a, b) => {
                  return new Date(a).getTime() - new Date(b).getTime()
                }).filter((v, i) => this.surveyCreated.indexOf(v) === i);
    
                for(let i=0; i<labels.length; i++){
                  labels[i] = new Date(labels[i]).toLocaleDateString('es-US');
                }
    
                this.lineChartLabels = labels;

            CanvasJS.addColorSet("satisfaction",
              [//colorSet Array
                "#E8EC14",
                "#49DC21",
                "#EE8713",
                "#F50000"
              ]);

            if (this.questionsCollectionMonthly[0].type != 'Abierta') {
              var chart0 = this.onCreateChart('monthlyChartContainer0', this.questionsCollectionMonthly, this.inputCollectionMonthly, 0);
              chart0.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 0).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[1].type != 'Abierta') {
              var chart1 = this.onCreateChart('monthlyChartContainer1', this.questionsCollectionMonthly, this.inputCollectionMonthly, 1);
              chart1.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 1).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[2].type != 'Abierta') {
              var chart2 = this.onCreateChart('monthlyChartContainer2', this.questionsCollectionMonthly, this.inputCollectionMonthly, 2);
              chart2.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 2).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[3].type != 'Abierta') {
              var chart3 = this.onCreateChart('monthlyChartContainer3', this.questionsCollectionMonthly, this.inputCollectionMonthly, 3);
              chart3.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 3).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[4].type != 'Abierta') {
              var chart4 = this.onCreateChart('monthlyChartContainer4', this.questionsCollectionMonthly, this.inputCollectionMonthly, 4);
              chart4.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 4).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[5].type != 'Abierta') {
              var chart5 = this.onCreateChart('monthlyChartContainer5', this.questionsCollectionMonthly, this.inputCollectionMonthly, 5);
              chart5.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 5).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[6].type != 'Abierta') {
              var chart6 = this.onCreateChart('monthlyChartContainer6', this.questionsCollectionMonthly, this.inputCollectionMonthly, 6);
              chart6.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 6).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[7].type != 'Abierta') {
              var chart7 = this.onCreateChart('monthlyChartContainer7', this.questionsCollectionMonthly, this.inputCollectionMonthly, 7);
              chart7.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 7).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[8].type != 'Abierta') {
              var chart8 = this.onCreateChart('monthlyChartContainer8', this.questionsCollectionMonthly, this.inputCollectionMonthly, 8);
              chart8.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 8).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[9].type != 'Abierta') {
              var chart9 = this.onCreateChart('monthlyChartContainer9', this.questionsCollectionMonthly, this.inputCollectionMonthly, 9);
              chart9.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 9).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[10].type != 'Abierta') {
              var chart10 = this.onCreateChart('monthlyChartContainer10', this.questionsCollectionMonthly, this.inputCollectionMonthly, 10);
              chart10.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 10).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[11].type != 'Abierta') {
              var chart11 = this.onCreateChart('monthlyChartContainer11', this.questionsCollectionMonthly, this.inputCollectionMonthly, 11);
              chart11.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 11).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[12].type != 'Abierta') {
              var chart12 = this.onCreateChart('monthlyChartContainer12', this.questionsCollectionMonthly, this.inputCollectionMonthly, 12);
              chart12.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 12).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[13].type != 'Abierta') {
              var chart13 = this.onCreateChart('monthlyChartContainer13', this.questionsCollectionMonthly, this.inputCollectionMonthly, 13);
              chart13.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 13).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[14].type != 'Abierta') {
              var chart14 = this.onCreateChart('monthlyChartContainer14', this.questionsCollectionMonthly, this.inputCollectionMonthly, 14);
              chart14.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 14).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[15].type != 'Abierta') {
              var chart15 = this.onCreateChart('monthlyChartContainer15', this.questionsCollectionMonthly, this.inputCollectionMonthly, 15);
              chart15.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 15).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[16].type != 'Abierta') {
              var chart16 = this.onCreateChart('monthlyChartContainer16', this.questionsCollectionMonthly, this.inputCollectionMonthly, 16);
              chart16.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 16).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[17].type != 'Abierta') {
              var chart17 = this.onCreateChart('monthlyChartContainer17', this.questionsCollectionMonthly, this.inputCollectionMonthly, 17);
              chart17.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 17).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[18].type != 'Abierta') {
              var chart18 = this.onCreateChart('monthlyChartContainer18', this.questionsCollectionMonthly, this.inputCollectionMonthly, 18);
              chart18.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 18).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[19].type != 'Abierta') {
              var chart19 = this.onCreateChart('monthlyChartContainer19', this.questionsCollectionMonthly, this.inputCollectionMonthly, 19);
              chart19.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 19).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[20].type != 'Abierta') {
              var chart20 = this.onCreateChart('monthlyChartContainer20', this.questionsCollectionMonthly, this.inputCollectionMonthly, 20);
              chart20.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 20).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[21].type != 'Abierta') {
              var chart21 = this.onCreateChart('monthlyChartContainer21', this.questionsCollectionMonthly, this.inputCollectionMonthly, 21);
              chart21.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 21).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[22].type != 'Abierta') {
              var chart22 = this.onCreateChart('monthlyChartContainer22', this.questionsCollectionMonthly, this.inputCollectionMonthly, 22);
              chart22.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 22).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[23].type != 'Abierta') {
              var chart23 = this.onCreateChart('monthlyChartContainer23', this.questionsCollectionMonthly, this.inputCollectionMonthly, 23);
              chart23.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 23).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[24].type != 'Abierta') {
              var chart24 = this.onCreateChart('monthlyChartContainer24', this.questionsCollectionMonthly, this.inputCollectionMonthly, 24);
              chart24.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 24).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[25].type != 'Abierta') {
              var chart25 = this.onCreateChart('monthlyChartContainer25', this.questionsCollectionMonthly, this.inputCollectionMonthly, 25);
              chart25.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 25).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[26].type != 'Abierta') {
              var chart26 = this.onCreateChart('monthlyChartContainer26', this.questionsCollectionMonthly, this.inputCollectionMonthly, 26);
              chart26.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 26).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[27].type != 'Abierta') {
              var chart27 = this.onCreateChart('monthlyChartContainer27', this.questionsCollectionMonthly, this.inputCollectionMonthly, 27);
              chart27.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 27).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[28].type != 'Abierta') {
              var chart28 = this.onCreateChart('monthlyChartContainer28', this.questionsCollectionMonthly, this.inputCollectionMonthly, 28);
              chart28.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 28).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[29].type != 'Abierta') {
              var chart29 = this.onCreateChart('monthlyChartContainer29', this.questionsCollectionMonthly, this.inputCollectionMonthly, 29);
              chart29.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 29).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[30].type != 'Abierta') {
              var chart30 = this.onCreateChart('monthlyChartContainer30', this.questionsCollectionMonthly, this.inputCollectionMonthly, 30);
              chart30.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 30).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[31].type != 'Abierta') {
              var chart31 = this.onCreateChart('monthlyChartContainer31', this.questionsCollectionMonthly, this.inputCollectionMonthly, 31);
              chart31.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 31).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[32].type != 'Abierta') {
              var chart32 = this.onCreateChart('monthlyChartContainer32', this.questionsCollectionMonthly, this.inputCollectionMonthly, 32);
              chart32.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 32).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[33].type != 'Abierta') {
              var chart33 = this.onCreateChart('monthlyChartContainer33', this.questionsCollectionMonthly, this.inputCollectionMonthly, 33);
              chart33.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 33).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[34].type != 'Abierta') {
              var chart34 = this.onCreateChart('monthlyChartContainer34', this.questionsCollectionMonthly, this.inputCollectionMonthly, 34);
              chart34.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 34).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[35].type != 'Abierta') {
              var chart35 = this.onCreateChart('monthlyChartContainer35', this.questionsCollectionMonthly, this.inputCollectionMonthly, 35);
              chart35.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 35).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[36].type != 'Abierta') {
              var chart36 = this.onCreateChart('monthlyChartContainer36', this.questionsCollectionMonthly, this.inputCollectionMonthly, 36);
              chart36.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 36).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[37].type != 'Abierta') {
              var chart37 = this.onCreateChart('monthlyChartContainer37', this.questionsCollectionMonthly, this.inputCollectionMonthly, 37);
              chart37.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 37).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[38].type != 'Abierta') {
              var chart38 = this.onCreateChart('monthlyChartContainer38', this.questionsCollectionMonthly, this.inputCollectionMonthly, 38);
              chart38.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 38).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[39].type != 'Abierta') {
              var chart39 = this.onCreateChart('monthlyChartContainer39', this.questionsCollectionMonthly, this.inputCollectionMonthly, 39);
              chart39.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 39).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[40].type != 'Abierta') {
              var chart40 = this.onCreateChart('monthlyChartContainer40', this.questionsCollectionMonthly, this.inputCollectionMonthly, 40);
              chart40.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 40).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[41].type != 'Abierta') {
              var chart41 = this.onCreateChart('monthlyChartContainer41', this.questionsCollectionMonthly, this.inputCollectionMonthly, 41);
              chart41.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 41).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[42].type != 'Abierta') {
              var chart42 = this.onCreateChart('monthlyChartContainer42', this.questionsCollectionMonthly, this.inputCollectionMonthly, 42);
              chart42.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 42).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[43].type != 'Abierta') {
              var chart43 = this.onCreateChart('monthlyChartContainer43', this.questionsCollectionMonthly, this.inputCollectionMonthly, 43);
              chart43.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 43).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[44].type != 'Abierta') {
              var chart44 = this.onCreateChart('monthlyChartContainer44', this.questionsCollectionMonthly, this.inputCollectionMonthly, 44);
              chart44.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 44).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[45].type != 'Abierta') {
              var chart45 = this.onCreateChart('monthlyChartContainer45', this.questionsCollectionMonthly, this.inputCollectionMonthly, 45);
              chart45.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 45).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[46].type != 'Abierta') {
              var chart46 = this.onCreateChart('monthlyChartContainer46', this.questionsCollectionMonthly, this.inputCollectionMonthly, 46);
              chart46.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 46).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[47].type != 'Abierta') {
              var chart47 = this.onCreateChart('monthlyChartContainer47', this.questionsCollectionMonthly, this.inputCollectionMonthly, 47);
              chart47.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 47).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[48].type != 'Abierta') {
              var chart48 = this.onCreateChart('monthlyChartContainer48', this.questionsCollectionMonthly, this.inputCollectionMonthly, 48);
              chart48.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 48).filter((element) => { return element != "" });
            }

            if (this.questionsCollectionMonthly[49].type != 'Abierta') {
              var chart49 = this.onCreateChart('monthlyChartContainer49', this.questionsCollectionMonthly, this.inputCollectionMonthly, 49);
              chart49.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollectionMonthly, 49).filter((element) => { return element != "" });
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
            text: this.questionsCollectionMonthly[questionNumber].questionTxt,
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
            text: this.questionsCollectionMonthly[questionNumber].questionTxt,
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
    this.monthlyDataTable.push(configChart.data[0].dataPoints);
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
