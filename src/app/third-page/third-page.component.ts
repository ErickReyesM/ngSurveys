import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { DataService } from 'src/seervices/data.service';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})

export class ThirdPageComponent implements OnInit{

  @ViewChild('questionContainer') questionContainer: ElementRef;

  selected:string = 'option2';
  surveyID:string = '';

 constructor(private route:ActivatedRoute, private data:DataService) {
   this.route.queryParams.subscribe( param => {this.surveyID = param['id']} );
 }

 ngOnInit(){
   this.data.setSurveyId(this.surveyID);
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
    pdf.save(this.surveyID+'.pdf'); // Generated PDF   
  });
}
}