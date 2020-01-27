
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';



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
          path: 'product',
          component: ProductComponent,
          data: {
            title: 'Product'
          }
        },
        {
          path: 'addproduct',
          component: AddproductComponent,
          data: {
            title: 'addproduct'
          }
        },
        {
          path: 'viewproduct',
          component: ViewproductComponent,
          data: {
            title: 'viewproduct'
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
