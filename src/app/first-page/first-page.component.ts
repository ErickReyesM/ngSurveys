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

  onSearchChange(searchValue : string){
    if(searchValue.length > 0){
      this.isEnabled = true;
    }
    return this.isEnabled;
  }

  onGoToQuestions(value: string){
    this.data.changeMessage(value);
  }
  
}
