import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})

export class ThirdPageComponent implements OnInit{

  @ViewChild('content') content: ElementRef;

  /*Doughnut Chart Data*/
public doughnutChartLabels:string[] = [];
public doughnutChartData:number[] = [];
public doughnutChartType:string = 'doughnut';

/**Line Chart Data */
public lineChartData:Array<any> = [];
public lineChartLabels:Array<any> = [];
public lineChartOptions:any = {responsive: true};
public lineChartLegend:boolean = true;
public lineChartType:string = 'line';

 createdDate:any[] = [];
 inputCollection:any[] = [];
 valueInputQ:any[] = [];
 valueInputLabels:any[] = [];
 collection:string = 'userInput';
 surveyId:string = '';
 dataSet:any[] = []; 
 labelsByHour:any[] = ['8-9','9-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17','17-18','18-19','19-20'];

  constructor(private route:ActivatedRoute) {
    this.route.queryParams.subscribe( param => {this.surveyId = param['id']; } )

    firebase.firestore().collection(this.collection).where('surveyID', '==', this.surveyId)
    .get().then( querySnapshot => { 
      querySnapshot.docs.forEach( doc => {
        this.inputCollection.push(doc.data());
      });
      this.inputCollection.forEach(doc => { this.createdDate.push(doc.created.toDate()); });
      this.dataSet = this.countByDay(this.createdDate);
    })
    .catch((err)=>{ console.log(err); });
   }

  ngOnInit(): void {
    this.lineChartData = [
      { data: this.dataSet, label: 'Encuestas A' },
    ];

    this.lineChartLabels = this.labelsByHour;
    
     /*
     let x = (names) => names.filter((v,i) => names.indexOf(v) === i);
     this.doughnutChartData = this.countInputValue(this.valueInputQ);
     this.doughnutChartLabels = x(this.valueInputQ);*/
  }

  countInputValue(array_elements:any[]):any[] {
    let count:any[] = [];
    var current = null;
    var cnt = 1;
    array_elements.sort();
    for (var i = 0; i < array_elements.length; i++) {
      current = array_elements[i+1];
        if (array_elements[i] != current) {
          count.push(cnt);
          cnt = 1;
        } else {
            cnt++;
        }
      }
    return count;
}

  countByDay(array_elements:any[]):any[]{
    let aux:Array<number> = [];
    array_elements.forEach((date)=>{
      aux.push(date.getHours());
    });
    let hours:Array<number> = aux.concat([8,9,10,11,12,13,14,15,16,17,18,19,20]);
    let count:any[] = [];
    var current = null;
    var cnt = 0;
    hours.sort((a, b) => a - b);
    for (var i = 0; i < hours.length; i++) {
      current = hours[i+1];
        if (hours[i] != current) {
          count.push(cnt);
          cnt = 0;
        } else {
            cnt++;
        }
      }
      return count;
}

  public onDownloadPDF(){
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    }

    let content = this.content.nativeElement;

    console.log(content.innerHTML);


    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('test.pdf');
  }

}
