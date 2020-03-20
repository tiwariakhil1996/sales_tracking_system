import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';
import { AddactivityComponent } from './addactivity/addactivity.component';
import { CurrentactivityComponent } from './currentactivity/currentactivity.component';

// Angular

import { AgmCoreModule } from '@agm/core';
import { TabsModule, TooltipModule } from 'ngx-bootstrap';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
   
    FormsModule,
    TabsModule.forRoot(),
    ActivityRoutingModule,
    TooltipModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBaU6eEpioeuf9Nkzsd5N3OoJsDpVQdzEs'
      // libraries: ['places']
    }),
    AgmDirectionModule
  ],
  declarations: [
    ActivityComponent,
    AddactivityComponent,
    CurrentactivityComponent
  ]
})
export class ActivityModule { }
