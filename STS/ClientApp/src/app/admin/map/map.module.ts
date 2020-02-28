import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MapRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAgmJb337SljuWJnzPXRyMjiTSL1DWcBq8'
      // libraries: ['places']
    }),
  ],
  declarations: [
    MapComponent
  ]
})
export class MapModule { }
