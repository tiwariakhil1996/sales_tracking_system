import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './client.component';
import { AddclientComponent } from './addclient/addclient.component';
import { ViewclientComponent } from './viewclient/viewclient.component';
import { ChattingComponent } from './chatting/chatting.component';

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
      },
      {
        path: 'chatting',
        component: ChattingComponent,
        data: {
          title: 'Chatting'
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
