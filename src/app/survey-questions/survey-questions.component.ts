import { Component, OnInit } from '@angular/core';
import { Survey } from '../data/survey.interface';
import { DataService } from 'src/seervices/data.service';

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.css']
})
export class SurveyQuestionsComponent implements OnInit {

  title:string;
  message: string;
  count:number = 1;
  questionsSet:Survey = {title: "", questions: []};

  constructor(private data: DataService) { }

  ngOnInit() {
    console.log('*' + this.title + '*');
    this.data.currentMessage.subscribe(message=> this.title = message);
    console.log('**' + this.title + '**');
    this.questionsSet.title = this.message;
    console.log('***' + this.questionsSet.title + '***');
  }

  onAddQuestion(question:string){
    this.count += 1;
    this.questionsSet.questions.push(question);
  }

  onFinishSurvey(){
    console.log(this.questionsSet);
  }

}
