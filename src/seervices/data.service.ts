import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('Sondaggio');
  currentMessage = this.messageSource.asObservable();

  private surveyId = new BehaviorSubject('');
  idOfTheSurvey = this.surveyId.asObservable();

  private sDescription = new BehaviorSubject('');
  surveyDescription = this.sDescription.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  setSurveyId(sId: string){
    this.surveyId.next(sId);
  }

  setSurveyDescription(sDesc: string){
    this.sDescription.next(sDesc);
  }

}