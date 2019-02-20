import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/seervices/data.service';
import types from '../data/surveytypes';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  surveyTypes:any = [];

  ngOnInit(): void {
    this.surveyTypes = types;
  }

  constructor(private data: DataService) {}

  onGoToQuestions(sTitle: string, sDescription:string){
    this.data.changeMessage(sTitle);
    this.data.setSurveyDescription(sDescription);
  }
  
}
