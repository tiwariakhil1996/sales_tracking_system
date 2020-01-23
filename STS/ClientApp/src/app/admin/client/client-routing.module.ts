import { ViewclientComponent } from './viewclient/viewclient.component';
import { AddclientComponent } from './addclient/addclient.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './client.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: ClientComponent,
  //   data: {
  //     title: 'Client'
  //   }
  // }

  {
    path: '',
    data: {
      title: 'Client'
    },
    children: [
   
      {
        path: 'addclient',
        component: AddclientComponent,
        data: {
          title: 'Add Client'
        }
      },
      {
        path: 'viewclient',
        component: ViewclientComponent,
        data: {
          title: 'View Client'
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
