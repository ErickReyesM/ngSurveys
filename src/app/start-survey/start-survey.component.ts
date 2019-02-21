import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { DataService } from 'src/seervices/data.service';

@Component({
  selector: 'app-start-survey',
  templateUrl: './start-survey.component.html',
  styleUrls: ['./start-survey.component.css']
})
export class StartSurveyComponent implements OnInit {

  surveyId:string = '';
  collectionFB:string = 'surveys';
  questions:any[] = [];
  questionCount:number = 0;
  questionText:string = '';
  questionType:string = '';
  numberOfQuestion:number;
  optionsInQuestion:any[] = [];
  myColor:string = 'primary';
  messageBtn:string = 'Siguiente';

  constructor(private data:DataService, private router: Router) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => { this.surveyId = message });
    firebase.firestore().collection(this.collectionFB).doc(this.surveyId).get()
    .then((doc)=>{
      this.questions = doc.get('questions');
    }).catch((err)=>{
      //TODO
    });
  }

  getQuestionLenght():number{
    return this.questions.length;
  }

  getQuestionText():string{
    return this.questions[this.questionCount].questionTxt;
  }

  getQuestionNumber():number{
    return this.questions[this.questionCount].numberOrd;
  }

  getQuestionOptions():string[]{
    return this.questions[this.questionCount].options;
  }

  getInputType():string{
    return this.questions[this.questionCount].type;
  }

  nextQuestion(){
    this.questionCount +=1;
    if (this.getQuestionLenght() === (this.questionCount + 1)){
      this.myColor = 'warn';
      this.messageBtn = 'Terminar Encuesta'
    }
  }
}
