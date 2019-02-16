import { Component } from '@angular/core';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})
export class ThirdPageComponent {

  surveysInDB:any[] = [];
  pageSize:number = 10;

  constructor() {  }

}
