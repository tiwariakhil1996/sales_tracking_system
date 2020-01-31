import { ViewdemoComponent } from './viewdemo/viewdemo.component';
import { AdddemoComponent } from './adddemo/adddemo.component';
import { DemoallapiComponent } from './demoallapi.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// const routes: Routes = [
//   {
//     path: '',
//     component: DemoallapiComponent,
//     data: {
//       title: 'DEMOALLAPI'
//     }
//   }
// ];
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
        title: 'DEMO ALL API'
      },
      children: [
        {
          path: '',
          redirectTo: 'demoallapi'
        },
        {
          path: 'demoallapi',
          component: DemoallapiComponent,
          data: {
            title: 'DEMO ALL API'
          }
        },
        {
          path: 'adddemo',
          component: AdddemoComponent,
          data: {
            title: 'Add Demo'
          }
        },
        {
          path: 'viewdemo',
          component: ViewdemoComponent,
          data: {
            title: 'View Demo'
          }
        },
      ]
  }
  ];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoallapiRoutingModule {}
