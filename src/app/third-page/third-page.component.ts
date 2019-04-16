import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
}