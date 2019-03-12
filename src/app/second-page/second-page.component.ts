import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import moment from 'moment';
import { MatDialog } from '@angular/material';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

export interface Question{
  order: number,
  text: string,
  type: string,
}

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {
  
  displayedColumns: string[] = ['position', 'question', 'type'];
  surveysInDB: any[] = [];
  gettingSurveys:boolean;
  collectionFB:string = 'surveys';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.gettingSurveys = true;
    this.GetPost();
  }

  GetPost(){
    this.surveysInDB = [];
    firebase.firestore().collection(this.collectionFB).orderBy("created","desc").get()
    .then((docs)=>{
      docs.forEach((doc)=>{
        this.surveysInDB.push(doc);
      })
      this.gettingSurveys = false;
    }).catch((err)=>{
      //TODO
    });
  }

  onStartSurvey(survey: any){
    window.location.replace('https://sondaggio-user.firebaseapp.com/?id='+survey.id);
  }

  ago(time){
    moment.locale("es-us")
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize();
  }

  openDialog(survey:any): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data : {surveyInfo: survey},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.GetPost();
    });
  }

}
