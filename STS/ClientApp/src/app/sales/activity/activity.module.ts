import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';
import { AddactivityComponent } from './addactivity/addactivity.component';
import { CurrentactivityComponent } from './currentactivity/currentactivity.component';
// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ActivityRoutingModule
  ],
  declarations: [
    ActivityComponent,
    AddactivityComponent,
    CurrentactivityComponent
  ]
})
export class ActivityModule { }
