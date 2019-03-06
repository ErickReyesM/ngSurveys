import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDataByDay(array_docs:firebase.firestore.QueryDocumentSnapshot[], day:Date):any[]{
    let today:Array<any> = [];
    array_docs.forEach(document => {
      if(document.data().created.toDate().getDay() == day.getDay()){
        today.push(document.data());
      }
    });
    return today;
  }

 getDataByWeek(array_docs:firebase.firestore.QueryDocumentSnapshot[], day:Date):any[]{
  let week:Array<any> = [];
  array_docs.forEach(document => {
    if(document.data().created.toDate().getDate() > (day.getDate() - 7) ){
      week.push(document.data());
    }
  });
  return week;
}

 getDataByMonth(array_docs:firebase.firestore.QueryDocumentSnapshot[], day:Date):any[]{
  let month:Array<any> = [];
  array_docs.forEach(document => {
    if(document.data().created.toDate().getMonth() == day.getMonth()){
      month.push(document.data());
    }
  });
  return month;
}
}
