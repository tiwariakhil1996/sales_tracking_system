import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SalesdataRoutingModule } from './salesdata-routing.module';
import { SalesdataComponent } from './salesdata.component';
// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SalesdataRoutingModule
  ],
  declarations: [
    SalesdataComponent
  ]
})
export class SalesdataModule { }
