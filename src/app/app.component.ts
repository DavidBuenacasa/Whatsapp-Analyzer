
import { ChangeDetectorRef, Component } from '@angular/core';
import {LayoutModule, } from '@angular/cdk/layout';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tittle = "tsparticles";


  constructor(){

  }

  ngOnInit(): void {

  }
  
}
