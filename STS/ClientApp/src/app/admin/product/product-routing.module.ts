
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: ProductComponent,
//     data: {
//       title: 'Product'
//     }
//   }
// ];
const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    data: {
      title: 'Product'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
