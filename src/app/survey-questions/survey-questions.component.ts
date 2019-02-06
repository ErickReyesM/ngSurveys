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

  surveyTitle:string = '';
  count:number = 1;
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

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questionType, event.previousIndex, event.currentIndex);
  }

}
