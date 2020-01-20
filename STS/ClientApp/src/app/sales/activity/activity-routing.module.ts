import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity.component';
import { AddactivityComponent } from './addactivity/addactivity.component';
import { PastactivityComponent } from './pastactivity/pastactivity.component';
import { CurrentactivityComponent } from './currentactivity/currentactivity.component';


const routes: Routes = [
//   {
//     path: '',
//     component: ActivityComponent,
//     data: {
//       title: 'Activity'
//     }
//   }

  {
    path: '',
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
          title: 'Add_Activity'
        }
      },
      {
        path: 'pastactivity',
        component: PastactivityComponent,
        data: {
          title: 'Past_Activity'
        }
      },
      {
        path: 'currentactivity',
        component: CurrentactivityComponent,
        data: {
          title: 'Current_Activity'
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
