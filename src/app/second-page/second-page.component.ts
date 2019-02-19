import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import moment from 'moment';
import { DataService } from 'src/seervices/data.service';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {
  
  surveysInDB: any[] = [];
  pageSize:number = 10;
  gettingSurveys:boolean;
  collectionFB:string = 'surveys';

  constructor(private data:DataService) { }

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
      console.log(this.surveysInDB);
      this.gettingSurveys = false;
    }).catch((err)=>{
      console.log(err);
    })
  }

  onOpenSurvey(sId:any){
    this.data.setSurveyId(sId.id);
  }

  onRemoveSurvey(survey: any) {
    firebase.firestore().collection(this.collectionFB).doc(survey.id).delete();
    const index:number = this.surveysInDB.indexOf(survey);
    if (index !== -1) {
      this.surveysInDB.splice(index, 1);
    } 
  }

  ago(time){
    moment.locale("es-us")
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize();
  }

}
