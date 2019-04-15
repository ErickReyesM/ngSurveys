import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDataByDay(array_docs:firebase.firestore.QueryDocumentSnapshot[], day:Date):any[]{
    let todayNow = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    let dayInSurvey:Date;
    let today:Array<any> = [];
    array_docs.forEach(document => {
      dayInSurvey = 
        new Date(document.data().created.toDate().getFullYear(), document.data().created.toDate().getMonth(), document.data().created.toDate().getDate());
      if(dayInSurvey.getTime() == todayNow.getTime()){
        today.push(document.data());
      }
    });
    return today;
  }

 getDataByWeek(array_docs:firebase.firestore.QueryDocumentSnapshot[], day:Date):any[]{
  let week:Array<any> = [];
  let seven = (day.getTime() - 691200000);
  array_docs.forEach(document => {
    if(document.data().created.toDate().getTime() >= seven ){
      week.push(document.data());
    }
  });
  return week;
}

 getDataByMonth(array_docs:firebase.firestore.QueryDocumentSnapshot[], day:Date):any[]{
  let monthNow = new Date(day.getFullYear(), day.getMonth());
  let dayInSurvey:Date;
  let month:Array<any> = [];
  array_docs.forEach(document => {
    dayInSurvey = 
        new Date(document.data().created.toDate().getFullYear(), document.data().created.toDate().getMonth());
    if(dayInSurvey.getTime() == monthNow.getTime()){
      month.push(document.data());
    }
  });
  return month;
}

count(array_docs:any[]):any[] {
  var current = null;
  var cnt = 0;
  var countTimes:Array<Number> = [];

  for (var i = 0; i < array_docs.length; i++) {
      if (array_docs[i] != current) {
          if (cnt > 0) {
              countTimes.push(cnt);
          }
          current = array_docs[i];
          cnt = 1;
      } else {
          cnt++;
      }
  }
  if (cnt > 0) {
    countTimes.push(cnt);
  }
  return countTimes;
}

/**
 * countInputByQuestion
 *
 */
public countInputByQuestion(questionCollection:any[], questionNumber:number):any[] {
  let valueInAnswer:Array<any> = [];
  for(let x = 0; x < questionCollection.length ;x++){
    if(questionCollection[x][questionNumber].type !=  'Opción Multitple'){
      valueInAnswer.push(questionCollection[x][questionNumber].value);
    }
    else{ 
      valueInAnswer = valueInAnswer.concat(questionCollection[x][questionNumber].options);
     }
}
  return valueInAnswer;
}

public getSatisfactionLabels(inputLabels:any[]){
  return inputLabels.filter(function(item, index){
		return inputLabels.indexOf(item) >= index;
	});
}

}
