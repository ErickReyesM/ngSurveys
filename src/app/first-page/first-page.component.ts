import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/seervices/data.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  ngOnInit(): void {}

  constructor(private data: DataService) {}

  onGoToQuestions(sTitle: string, sDescription:string){
    this.data.changeMessage(sTitle);
    this.data.setSurveyDescription(sDescription);
  }
  
}
