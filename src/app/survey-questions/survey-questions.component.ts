import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/seervices/data.service';
import { Survey } from '../data/survey.interface';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.css']
})
export class SurveyQuestionsComponent implements OnInit {

  radioType:string;
  surveyTitle:string = '';
  count:number = 1;
  optionLetter:string = 'a';
  questionsSet:any = [];
  questionType:any = ['satisfaction', 'options', 'open'];
  surveyQuestion: { title:string, questions:Survey[] };

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message=> this.surveyTitle = message);
  }

  onAddQuestion(question:string){
    this.count += 1;
    this.questionsSet.push(question);
  }

  onFinishSurvey(){
    console.log(this.getNextChar('a'));
  }

  getNextChar(char:String): String{
     const code = char.charCodeAt(0).valueOf()
     let i = code;
     i++;
     return String.fromCharCode(i);
  }
}
