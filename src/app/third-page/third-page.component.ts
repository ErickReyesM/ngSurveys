import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/seervices/data.service';
import firebase from 'firebase';
import moment from 'moment';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})
export class ThirdPageComponent implements OnInit{

  surveyId:string = '';
  survey:any[] = [];
  collectionFB:string = 'surveys'
  title:string = '';
  createdOn:any;
  questions:any[] = []
  isGettingSurvey:boolean = false;

  constructor(private data:DataService) { 
   }

  ngOnInit(): void {
    this.isGettingSurvey = true;
    this.data.idOfTheSurvey.subscribe(message => this.surveyId = message);
    firebase.firestore().collection(this.collectionFB).doc(this.surveyId).get()
    .then((doc)=>{
      this.questions = doc.get('questions');
      this.createdOn = this.ago(doc.data().created.toDate());
      this.title = doc.data().surveyTitle;
      this.isGettingSurvey = false;
    }).catch((err)=>{
      //TODO
    });
  }

  ago(time){
    moment.locale("es-us")
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize();
  }

}
