import { ViewclientComponent } from './viewclient/viewclient.component';
import { AddclientComponent } from './addclient/addclient.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './client.component';

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
        title: 'Client'
      },
      children: [
        {
          path: '',
          redirectTo: 'client'
        },
        {
          path: 'addclient',
          component: AddclientComponent,
          data: {
            title: 'Add_Client'
          }
        },
        {
          path: 'viewclient',
          component:ViewclientComponent,
          data: {
            title: 'View_Client'
          }
        }
        
      ]
  }
  ];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
