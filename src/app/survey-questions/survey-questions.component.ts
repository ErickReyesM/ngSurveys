import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/seervices/data.service';
import { Survey } from '../data/survey.interface';
import firebase from 'firebase';

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
  questionType:any[] = ['Satisfacción', 'Opción Multitple', 'Abierta', 'Elección'];
  numberOption:number = 98;
  surveyQuestion: { title:string, questions:Survey[] };
  sendingSurvey:boolean = false;
  optionCount:number = 1;
  createdOptions:any[] = [];
  optInp1:string = '';
  optInp2:string = '';
  optInp3:string = '';
  optInp4:string = '';
  optInp5:string = '';
  optInp6:string = '';
  questionTxt:string = '';

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message=> this.surveyTitle = message);
  }

  onAddQuestion(question:string){
    var filtered = this.createdOptions.filter((el)=>{
      return el != '';
    });
      let questObj = {
        numberOrd: this.count,
        questionTxt: question,
        type: this.radioType,
        options: filtered
      };
      this.questionsSet.push(questObj);
      console.log(this.questionsSet);
    this.count += 1;
  }

  onAddOptions(optIn1:string, optIn2:string, optIn3?:string, optIn4?:string, optIn5?:string, optIn6?:string){
    this.createdOptions = [optIn1,optIn2,optIn3,optIn4,optIn5,optIn6];
  }

  onFinishSurvey(){
    this.sendingSurvey = true;
    firebase.firestore().collection("surveys").add({
      surveyTitle: this.surveyTitle,
      questions: this.questionsSet,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then(data => {
      this.sendingSurvey = false;
      //data TODO
    }).catch(err => {
      //TODO
    });
    window.location.reload();
  }

  onAddNewOption(){
    this.optionCount += 1;
  }
}
