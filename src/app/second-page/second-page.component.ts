import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import moment from 'moment';
import { DataService } from 'src/seervices/data.service';
import { Router } from '@angular/router';

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
  pageSize:number = 10;
  gettingSurveys:boolean;
  collectionFB:string = 'surveys';

  constructor(private data:DataService, private router: Router) { }

  ngOnInit() {
    this.gettingSurveys = true;
    this.GetPost();
  }

  GetPost(){
    this.surveysInDB = [];
    firebase.firestore().collection(this.collectionFB).orderBy("created","desc").limit(this.pageSize).get()
    .then((docs)=>{
      docs.forEach((doc)=>{
        this.surveysInDB.push(doc);
      })
      this.gettingSurveys = false;
    }).catch((err)=>{
      //TODO
    });
  }

  onRemoveSurvey(survey: any) {
    firebase.firestore().collection(this.collectionFB).doc(survey.id).delete();
    const index:number = this.surveysInDB.indexOf(survey);
    if (index !== -1) {
      this.surveysInDB.splice(index, 1);
    } 
  }

  onStartSurvey(survey: any){
    window.location.replace('http://localhost:4200/survey/?id='+survey.id)
  }

  fullScreen(){
    let elem = document.documentElement;
    let methodInvoked = elem.requestFullscreen || elem['mozRequestFullscreen']
    || elem['msRequestFullscreen'];
    if (methodInvoked) methodInvoked.call(elem);
  }

  ago(time){
    moment.locale("es-us")
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize();
  }

}
