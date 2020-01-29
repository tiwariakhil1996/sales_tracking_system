import { DemoallapiComponent } from './demoallapi.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DemoallapiRoutingModule } from './demoallapi-routing.module';

// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,  
    DemoallapiRoutingModule
  ],
  declarations: [
    DemoallapiComponent
  ]
})
export class DemoallapiModule { }
