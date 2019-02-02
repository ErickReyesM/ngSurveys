import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/seervices/data.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{

  message: string;
  welcomeMessage: boolean = true;
  
  constructor(private breakpointObserver: BreakpointObserver, private data: DataService) {}

  ngOnInit() {
    this.data.currentMessage.subscribe(message=> this.message = message);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  onNavigate(){
    this.welcomeMessage = false;
  }

}
