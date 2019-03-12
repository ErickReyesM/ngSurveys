import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/seervices/data.service';
import firebase from 'firebase';
import { MatDialog } from '@angular/material';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';

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
  sDescription:string = '';

  constructor(private data: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(title=> this.surveyTitle = title);
    this.data.surveyDescription.subscribe(desc => this.sDescription = desc);
  }

  onAddQuestion(question: string){
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
    this.count += 1;
    this.optInp1 = '';
    this.optInp2 = '';
    this.optInp3 = '';
    this.optInp4 = '';
    this.optInp5 = '';
    this.optInp6 = '';
    this.optionCount = 1;
  }

  onAddOptions(optIn1:string, optIn2:string, optIn3?:string, optIn4?:string, optIn5?:string, optIn6?:string){
    this.createdOptions = [optIn1,optIn2,optIn3,optIn4,optIn5,optIn6];
  }

  onFinishSurvey(){
    this.sendingSurvey = true;
    firebase.firestore().collection("surveys").add({
      surveyTitle: this.surveyTitle,
      surveyDescription: this.sDescription,
      questions: this.questionsSet,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then(data => {
      this.sendingSurvey = false;
      this.openDialog(data.id);
    }).catch(err => {
      //TODO
    });
  }

  onAddNewOption(){
    this.optionCount += 1;
  }

  openDialog(surveyId:string): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {id: surveyId},
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

}
