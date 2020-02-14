import { DemoallapiComponent } from './demoallapi.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DemoallapiRoutingModule } from './demoallapi-routing.module';
import { AdddemoComponent } from './adddemo/adddemo.component';
import { ViewdemoComponent } from './viewdemo/viewdemo.component';

// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,  
    //it is compulsury to import the this path for routing...
    DemoallapiRoutingModule
  ],
  declarations: [
    DemoallapiComponent,
    AdddemoComponent,
    ViewdemoComponent
  ]
})
export class DemoallapiModule { }
