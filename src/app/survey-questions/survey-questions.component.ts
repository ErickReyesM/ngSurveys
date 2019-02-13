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
  questionsSet: { numberOrd:number, questionTxt:string, type:string, options:any[] }[] = [];
  questionType:any = ['Satisfacción', 'Opción Multitple', 'Abierta'];
  numberOption:number = 97;
  surveyQuestion: { title:string, questions:Survey[] };
  optionEntry:string = '';

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message=> this.surveyTitle = message);
  }

  onAddQuestion(question:string){
      let questObj = {
        numberOrd: this.count,
        questionTxt: question,
        type: this.radioType,
        options: []
      };
      this.questionsSet.push(questObj);
      console.log(this.questionsSet);
    this.count += 1;
  }

  onFinishSurvey(){
    //console.log(this.questionsSet);
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
