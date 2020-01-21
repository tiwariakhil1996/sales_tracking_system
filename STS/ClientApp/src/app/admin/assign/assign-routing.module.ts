import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignComponent } from './assign.component';

const routes: Routes = [
  {
    path: '',
    component: AssignComponent,
    data: {
      title: 'Assign'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignRoutingModule {}
