import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/seervices/data.service';
import { Survey } from '../data/survey.interface';
import firebase from 'firebase';
import { Option } from './option.class';

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.css']
})
export class SurveyQuestionsComponent implements OnInit {

  radioType:string='';
  surveyTitle:string = '';
  count:number = 1;
  questionsSet: { numberOrd:number, questionTxt:string, type:string, options?:any[] }[] = [];
  questionType:any[] = ['Satisfacción', 'Opción Multitple', 'Abierta'];
  numberOption:number = 98;
  surveyQuestion: { title:string, questions:Survey[] };
  sendingSurvey:boolean = false;
  optionCount:number = 1;
  createdOptions:Option[] = [];


  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message=> this.surveyTitle = message);
  }

  onAddQuestion(question:string){
      let questObj = {
        numberOrd: this.count,
        questionTxt: question,
        type: this.radioType,
        //options: []
      };
      this.questionsSet.push(questObj);
      console.log(this.questionsSet);
    this.count += 1;
  }

  onFinishSurvey(){
    this.sendingSurvey = true;
    firebase.firestore().collection("surveys").add({
      surveyTitle: this.surveyTitle,
      questions: this.questionsSet,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then(data => {
      this.sendingSurvey = false;
      console.log('***' + data + '***');
    }).catch(err => {
      console.log(err);
    })
  }

  onLoadOptions(input: string){
    let optionInput = new Option(this.optionCount, input);
    this.createdOptions.push(optionInput);
    console.log(this.createdOptions);
  }

  onAddNewOption(){
    this.optionCount += 1;
    console.log(this.optionCount);
  }

  /*
  onDeleteOption(letter: string){
    const index:number = this.createdOptions.indexOf(letter);
    console.log('delete: '+ letter);
    if (index !== -1) {
      this.options.splice(index, 1);
      this.numberOption -= 1;
    } 
  }*/

}
