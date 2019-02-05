import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/seervices/data.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent {
  isEnabled:boolean = false;

  constructor(private data: DataService) {}

  onGoToQuestions(value: string){
    this.data.changeMessage(value);
  }
  
}
