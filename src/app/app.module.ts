import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, MatTableModule,
  MatExpansionModule, MatListModule, MatRadioModule, MatInputModule, MatCardModule, MatProgressBarModule, MatCheckboxModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { DataService } from 'src/seervices/data.service';

import firebase from 'firebase';
import { StartSurveyComponent } from './start-survey/start-survey.component';

var config = {
  apiKey: "AIzaSyCMsiQRCVEa-qzxA-bnt-Jk5FXyOQgFrBw",
  authDomain: "sondaggio-ea6bf.firebaseapp.com",
  databaseURL: "https://sondaggio-ea6bf.firebaseio.com",
  projectId: "sondaggio-ea6bf",
  storageBucket: "",
  messagingSenderId: "22946728796"
};
firebase.initializeApp(config);

const appRoutes: Routes = [
  { path: 'survey-creator', component: FirstPageComponent },
  { path: 'my-surveys', component: SecondPageComponent },
  { path: 'report', component: ThirdPageComponent },
  { path: 'survey-questions', component: SurveyQuestionsComponent },
  { path: 'survey', component: StartSurveyComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    SurveyQuestionsComponent,
    StartSurveyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot(appRoutes, {initialNavigation: false}),
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTableModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
