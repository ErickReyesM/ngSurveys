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
  optionLetter:any = ['a'];
  questionsSet:any = [];
  questionType:any = ['satisfaction', 'options', 'open'];
  numberOption:number = 97;
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
    //console.log(this.getNextChar());
  }

  getNextChar(): any[]{
    this.numberOption += 1;
    this.optionLetter.push(String.fromCharCode(this.numberOption));
    return this.optionLetter;
  }

  onAddOption(){
    this.getNextChar();
  }

  onDeleteOption(letter: string){
    const index:number = this.optionLetter.indexOf(letter);
    console.log('delete: '+ letter);
    if (index !== -1) {
      this.optionLetter.splice(index, 1);
      this.numberOption -= 1;
    } 
  }

}
