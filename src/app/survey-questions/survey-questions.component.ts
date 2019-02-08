import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/seervices/data.service';
import { Survey } from '../data/survey.interface';

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.css']
})
export class SurveyQuestionsComponent implements OnInit {

  radioType:string='';
  surveyTitle:string = '';
  count:number = 1;
  optionLetter:string = 'a';
  questionsSet:any = [];
  questionType:any = ['satisfaction', 'options', 'open'];
  numberOption:number;
  surveyQuestion: { title:string, questions:Survey[] };

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message=> this.surveyTitle = message);
  }

  onAddQuestion(question:string){
    this.count += 1;
    this.questionsSet.push(question);
    console.log(this.radioType);
  }

  onFinishSurvey(){
    console.log(this.getNextChar());
  }

  getNextChar(): String{
    const code = this.optionLetter.charCodeAt(0);
    let next = code;
    this.numberOption = next;
    this.numberOption += 1;
    this.optionLetter = String.fromCharCode(this.numberOption);
    return this.optionLetter;
  }
}
