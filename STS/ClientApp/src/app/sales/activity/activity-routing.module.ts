import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity.component';
import { AddactivityComponent } from './addactivity/addactivity.component';
import { CurrentactivityComponent } from './currentactivity/currentactivity.component';
import { SalesGuard } from '../../sales.guard';


const routes: Routes = [


  {
    path: '',
    // canActivate: [SalesGuard],
    data: {
      title: 'Activity'
    },
    children: [
      {
        path: '',
        redirectTo: 'activity'
      },
      {
        path: 'activity',
        component: ActivityComponent,
        data: {
          title: 'Activity'
        }
      },
      {
        path: 'addactivity',
        component: AddactivityComponent,
        data: {
          title: 'Add Activity'
        }
      },
      {
        path: 'currentactivity',
        component: CurrentactivityComponent,
        data: {
          title: 'Current Activity'
        }
      },
    ]
}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule {}
