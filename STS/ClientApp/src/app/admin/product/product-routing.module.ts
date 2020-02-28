import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { ProductImagesComponent } from './product-images/product-images.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ProductComponent,
  //   data: {
  //     title: 'Product'
  //   }
  // }


  
  {
    path: '',
    data: {
      title: 'Product'
    },
    children: [
   
      {
        path: 'addproduct',
        component: AddproductComponent,
        data: {
          title: 'Add Product'
        }
      },
      {
        path: 'viewproduct',
        component: ViewproductComponent,
        data: {
          title: 'View Product'
        }
      },
      {
        path: 'product-images',
        component: ProductImagesComponent,
        data: {
          title: 'View Product'
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
