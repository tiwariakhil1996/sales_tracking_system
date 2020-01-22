import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MapRoutingModule
  ],
  declarations: [
    MapComponent
  ]
})
export class MapModule { }
