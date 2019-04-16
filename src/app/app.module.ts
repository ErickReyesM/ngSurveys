import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, MatTableModule, MatDialogModule,
  MatExpansionModule, MatListModule, MatRadioModule, MatInputModule, MatCardModule, MatProgressBarModule, MatCheckboxModule, MatSelectModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { DataService } from 'src/seervices/data.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import firebase from 'firebase';
import { DateService } from '../seervices/date.service';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { TodayChartReportComponent } from './today-chart-report/today-chart-report.component';
import { WeekChartReportComponent } from './week-chart-report/week-chart-report.component';
import { MonthChartReportComponent } from './month-chart-report/month-chart-report.component';
import {Text, geometry } from '@progress/kendo-drawing';
const { Point } = geometry;
import { PDFExportModule } from '@progress/kendo-angular-pdf-export'

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
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    SurveyQuestionsComponent,
    DialogConfirmationComponent,
    DialogDeleteComponent,
    TodayChartReportComponent,
    WeekChartReportComponent,
    MonthChartReportComponent
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
    MatTableModule,
    ChartsModule,
    MatSelectModule,
    MatDialogModule,
    PDFExportModule
  ],
  entryComponents: [DialogConfirmationComponent, DialogDeleteComponent],
  providers: [DataService, DateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
