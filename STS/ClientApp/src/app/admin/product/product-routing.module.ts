
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { AddproductComponent } from './addproduct/addproduct.component';

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
        title: 'Product'
      },
      children: [
        {
          path: '',
          redirectTo: 'product'
        },
        {
          path: 'addproduct',
          component: AddproductComponent,
          data: {
            title: 'Add_Product'
          }
        },
        {
          path: 'viewproduct',
          component:ViewproductComponent,
          data: {
            title: 'View_Product'
          }
        }
        
      ]
  }
  ];
  
  


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
