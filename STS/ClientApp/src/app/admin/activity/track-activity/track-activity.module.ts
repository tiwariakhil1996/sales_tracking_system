import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


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
      apiKey: 'AIzaSyAgmJb337SljuWJnzPXRyMjiTSL1DWcBq8'
      // libraries: ['places']
    }),
  ],
  declarations: [
    TrackActivityComponent
  ]
})
export class TrackActivityModule { }
