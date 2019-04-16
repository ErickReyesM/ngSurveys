import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { DateService } from 'src/seervices/date.service';
import * as firebase from 'firebase';
import { DataService } from 'src/seervices/data.service';
import * as CanvasJS from '../../assets/canvasjs.min.js';
import { ChartConfiguration } from 'src/assets/intarfaces/chart-configuration.interface.js';

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
    scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  /**Global Variables*/
  today: Date = new Date();
  title7ago: string = '';
  titleToday: string = '';
  sevenDays: number = 518400000;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  collectionInput: string = 'userInput';
  collectionSurveys: string = 'surveys';
  surveyId: string = '';
  surveyCreated: string[] = [];
  inputCollection: any[] = [];
  documents: any[] = [];
  inputType: string[] = [];
  questionsCollection: any[] = [];
  doughnutLabelContainer: any[] = [];
  doughnutDataContainer: any[] = [];
  commentsCollection: string[] = [];
  themeInCharts:string = "light2";
  surveyTitle:string = '';
  pdfTitle:string = '';

  constructor(private dateSrv: DateService, private dataSrv: DataService) {
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

        this.surveyTitle = docSnapshot.data().surveyTitle;
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
              {
                data: this.dateSrv.count(this.surveyCreated.sort((a, b) => {
                  return new Date(a).getTime() - new Date(b).getTime();
                })),
                label: 'Encuestas Por Día'
              });

            this.lineChartLabels = this.surveyCreated.sort((a, b) => {
              return new Date(a).getTime() - new Date(b).getTime()
            }).filter((v, i) => this.surveyCreated.indexOf(v) === i);

            CanvasJS.addColorSet("satisfaction",
              [//colorSet Array
                "#E8EC14",
                "#49DC21",
                "#EE8713",
                "#F50000"
              ]);

            if (this.questionsCollection[0].type != 'Abierta') {
              var chart0 = this.onCreateChart('chartContainer0', this.questionsCollection, this.inputCollection, 0);
              chart0.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 0).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[1].type != 'Abierta') {
              var chart1 = this.onCreateChart('chartContainer1', this.questionsCollection, this.inputCollection, 1);
              chart1.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 1).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[2].type != 'Abierta') {
              var chart2 = this.onCreateChart('chartContainer2', this.questionsCollection, this.inputCollection, 2);
              chart2.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 2).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[3].type != 'Abierta') {
              var chart3 = this.onCreateChart('chartContainer3', this.questionsCollection, this.inputCollection, 3);
              chart3.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 3).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[4].type != 'Abierta') {
              var chart4 = this.onCreateChart('chartContainer4', this.questionsCollection, this.inputCollection, 4);
              chart4.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 4).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[5].type != 'Abierta') {
              var chart5 = this.onCreateChart('chartContainer5', this.questionsCollection, this.inputCollection, 5);
              chart5.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 5).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[6].type != 'Abierta') {
              var chart6 = this.onCreateChart('chartContainer6', this.questionsCollection, this.inputCollection, 6);
              chart6.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 6).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[7].type != 'Abierta') {
              var chart7 = this.onCreateChart('chartContainer7', this.questionsCollection, this.inputCollection, 7);
              chart7.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 7).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[8].type != 'Abierta') {
              var chart8 = this.onCreateChart('chartContainer8', this.questionsCollection, this.inputCollection, 8);
              chart8.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 8).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[9].type != 'Abierta') {
              var chart9 = this.onCreateChart('chartContainer9', this.questionsCollection, this.inputCollection, 9);
              chart9.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 9).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[10].type != 'Abierta') {
              var chart10 = this.onCreateChart('chartContainer10', this.questionsCollection, this.inputCollection, 10);
              chart10.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 10).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[11].type != 'Abierta') {
              var chart11 = this.onCreateChart('chartContainer11', this.questionsCollection, this.inputCollection, 11);
              chart11.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 11).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[12].type != 'Abierta') {
              var chart12 = this.onCreateChart('chartContainer12', this.questionsCollection, this.inputCollection, 12);
              chart12.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 12).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[13].type != 'Abierta') {
              var chart13 = this.onCreateChart('chartContainer13', this.questionsCollection, this.inputCollection, 13);
              chart13.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 13).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[14].type != 'Abierta') {
              var chart14 = this.onCreateChart('chartContainer14', this.questionsCollection, this.inputCollection, 14);
              chart14.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 14).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[15].type != 'Abierta') {
              var chart15 = this.onCreateChart('chartContainer15', this.questionsCollection, this.inputCollection, 15);
              chart15.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 15).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[16].type != 'Abierta') {
              var chart16 = this.onCreateChart('chartContainer16', this.questionsCollection, this.inputCollection, 16);
              chart16.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 16).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[17].type != 'Abierta') {
              var chart17 = this.onCreateChart('chartContainer17', this.questionsCollection, this.inputCollection, 17);
              chart17.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 17).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[18].type != 'Abierta') {
              var chart18 = this.onCreateChart('chartContainer18', this.questionsCollection, this.inputCollection, 18);
              chart18.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 18).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[19].type != 'Abierta') {
              var chart19 = this.onCreateChart('chartContainer19', this.questionsCollection, this.inputCollection, 19);
              chart19.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 19).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[20].type != 'Abierta') {
              var chart20 = this.onCreateChart('chartContainer20', this.questionsCollection, this.inputCollection, 20);
              chart20.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 20).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[21].type != 'Abierta') {
              var chart21 = this.onCreateChart('chartContainer21', this.questionsCollection, this.inputCollection, 21);
              chart21.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 21).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[22].type != 'Abierta') {
              var chart22 = this.onCreateChart('chartContainer22', this.questionsCollection, this.inputCollection, 22);
              chart22.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 22).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[23].type != 'Abierta') {
              var chart23 = this.onCreateChart('chartContainer23', this.questionsCollection, this.inputCollection, 23);
              chart23.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 23).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[24].type != 'Abierta') {
              var chart24 = this.onCreateChart('chartContainer24', this.questionsCollection, this.inputCollection, 24);
              chart24.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 24).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[25].type != 'Abierta') {
              var chart25 = this.onCreateChart('chartContainer25', this.questionsCollection, this.inputCollection, 25);
              chart25.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 25).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[26].type != 'Abierta') {
              var chart26 = this.onCreateChart('chartContainer26', this.questionsCollection, this.inputCollection, 26);
              chart26.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 26).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[27].type != 'Abierta') {
              var chart27 = this.onCreateChart('chartContainer27', this.questionsCollection, this.inputCollection, 27);
              chart27.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 27).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[28].type != 'Abierta') {
              var chart28 = this.onCreateChart('chartContainer28', this.questionsCollection, this.inputCollection, 28);
              chart28.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 28).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[29].type != 'Abierta') {
              var chart29 = this.onCreateChart('chartContainer29', this.questionsCollection, this.inputCollection, 29);
              chart29.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 29).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[30].type != 'Abierta') {
              var chart30 = this.onCreateChart('chartContainer30', this.questionsCollection, this.inputCollection, 30);
              chart30.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 30).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[31].type != 'Abierta') {
              var chart31 = this.onCreateChart('chartContainer31', this.questionsCollection, this.inputCollection, 31);
              chart31.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 31).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[32].type != 'Abierta') {
              var chart32 = this.onCreateChart('chartContainer32', this.questionsCollection, this.inputCollection, 32);
              chart32.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 32).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[33].type != 'Abierta') {
              var chart33 = this.onCreateChart('chartContainer33', this.questionsCollection, this.inputCollection, 33);
              chart33.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 33).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[34].type != 'Abierta') {
              var chart34 = this.onCreateChart('chartContainer34', this.questionsCollection, this.inputCollection, 34);
              chart34.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 34).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[35].type != 'Abierta') {
              var chart35 = this.onCreateChart('chartContainer35', this.questionsCollection, this.inputCollection, 35);
              chart35.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 35).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[36].type != 'Abierta') {
              var chart36 = this.onCreateChart('chartContainer36', this.questionsCollection, this.inputCollection, 36);
              chart36.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 36).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[37].type != 'Abierta') {
              var chart37 = this.onCreateChart('chartContainer37', this.questionsCollection, this.inputCollection, 37);
              chart37.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 37).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[38].type != 'Abierta') {
              var chart38 = this.onCreateChart('chartContainer38', this.questionsCollection, this.inputCollection, 38);
              chart38.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 38).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[39].type != 'Abierta') {
              var chart39 = this.onCreateChart('chartContainer39', this.questionsCollection, this.inputCollection, 39);
              chart39.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 39).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[40].type != 'Abierta') {
              var chart40 = this.onCreateChart('chartContainer40', this.questionsCollection, this.inputCollection, 40);
              chart40.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 40).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[41].type != 'Abierta') {
              var chart41 = this.onCreateChart('chartContainer41', this.questionsCollection, this.inputCollection, 41);
              chart41.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 41).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[42].type != 'Abierta') {
              var chart42 = this.onCreateChart('chartContainer42', this.questionsCollection, this.inputCollection, 42);
              chart42.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 42).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[43].type != 'Abierta') {
              var chart43 = this.onCreateChart('chartContainer43', this.questionsCollection, this.inputCollection, 43);
              chart43.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 43).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[44].type != 'Abierta') {
              var chart44 = this.onCreateChart('chartContainer44', this.questionsCollection, this.inputCollection, 44);
              chart44.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 44).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[45].type != 'Abierta') {
              var chart45 = this.onCreateChart('chartContainer45', this.questionsCollection, this.inputCollection, 45);
              chart45.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 45).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[46].type != 'Abierta') {
              var chart46 = this.onCreateChart('chartContainer46', this.questionsCollection, this.inputCollection, 46);
              chart46.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 46).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[47].type != 'Abierta') {
              var chart47 = this.onCreateChart('chartContainer47', this.questionsCollection, this.inputCollection, 47);
              chart47.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 47).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[48].type != 'Abierta') {
              var chart48 = this.onCreateChart('chartContainer48', this.questionsCollection, this.inputCollection, 48);
              chart48.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 48).filter((element) => { return element != "" });
            }

            if (this.questionsCollection[49].type != 'Abierta') {
              var chart49 = this.onCreateChart('chartContainer49', this.questionsCollection, this.inputCollection, 49);
              chart49.render();
            } else {
              this.commentsCollection =
                this.dateSrv.countInputByQuestion(this.inputCollection, 49).filter((element) => { return element != "" });
            }

            this.pdfTitle = this.surveyTitle + '_' + this.today.toTimeString;
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
            text: this.questionsCollection[questionNumber].questionTxt,
            horizontalAlign: "left"
          },
          theme: this.themeInCharts,
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
        configChart = {
          animationEnabled: true,
          title: {
            text: this.questionsCollection[questionNumber].questionTxt,
            horizontalAlign: "left"
          },
          theme: this.themeInCharts,
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
