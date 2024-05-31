import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StatsComponentComponent } from './stats-component/stats-component.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InicioComponentComponent } from './inicio-component/inicio-component.component';
import { HttpClientModule } from '@angular/common/http';


const appRoot:Routes=[
  {path:"", component:InicioComponentComponent},
  {path:"stats", component:StatsComponentComponent},
]



@NgModule({
  declarations: [
    AppComponent,
    StatsComponentComponent,
    InicioComponentComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoot),
    HttpClientModule,

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
