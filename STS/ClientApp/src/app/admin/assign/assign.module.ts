import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AssignComponent } from './assign.component';
import { AssignRoutingModule } from './assign-routing.module';
// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AssignRoutingModule
  ],
  declarations: [
    AssignComponent
  ]
})
export class AssignModule { }
