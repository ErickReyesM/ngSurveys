import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/seervices/data.service';

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.css']
})
export class SurveyQuestionsComponent implements OnInit {

  title:string = '';
  count:number = 1;
  questionTxt:string = '';
  questionsSet:any = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message=> this.title = message);
  }

  onAddQuestion(question:string){
    this.count += 1;
    this.questionsSet.push(question);
  }

  onFinishSurvey(){
    console.log(this.title);
    console.log(this.questionsSet);
  }

}
