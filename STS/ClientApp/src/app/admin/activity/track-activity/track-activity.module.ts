import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, OnInit } from '@angular/core';


// import { MapRoutingModule } from './map-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { TrackActivityComponent } from './track-activity.component';

// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBaU6eEpioeuf9Nkzsd5N3OoJsDpVQdzEs'
      // libraries: ['places']
    }),
  ],
  declarations: [
    TrackActivityComponent
  ]
})
export class TrackActivityModule  implements OnInit{
  constructor(){
    
  }
  ngOnInit(){

  }

 }
