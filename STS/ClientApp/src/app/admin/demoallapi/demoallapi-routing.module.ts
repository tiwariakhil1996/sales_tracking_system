import { DemoallapiComponent } from './demoallapi.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: DemoallapiComponent,
    data: {
      title: 'DEMOALLAPI'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoallapiRoutingModule {}
