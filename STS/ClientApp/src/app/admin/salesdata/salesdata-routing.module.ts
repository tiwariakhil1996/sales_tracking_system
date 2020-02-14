import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesdataComponent } from './salesdata.component';


const routes: Routes = [
  {
    path: '',
    component: SalesdataComponent,
    data: {
      title: 'Salesdata'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesdataRoutingModule {}
