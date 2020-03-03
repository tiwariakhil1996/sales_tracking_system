import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';
import { AddactivityComponent } from './addactivity/addactivity.component';
import { CurrentactivityComponent } from './currentactivity/currentactivity.component';
import { TrackActivityComponent } from './track-activity/track-activity.component';
// Angular

import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ActivityRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBaU6eEpioeuf9Nkzsd5N3OoJsDpVQdzEs'
      // libraries: ['places']
    }),
  ],
  declarations: [
    ActivityComponent,
    AddactivityComponent,
    CurrentactivityComponent,
    TrackActivityComponent
  ]
})
export class ActivityModule { }
