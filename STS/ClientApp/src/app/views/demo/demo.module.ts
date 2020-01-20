import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DemoRoutingModule
  ],
  declarations: [
    DemoComponent
  ]
})
export class DemoModule { }
