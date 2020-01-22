import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule

  ],
  declarations: [
    ProductComponent,
    AddproductComponent,
    ViewproductComponent
  ]
})
export class ProductModule { }
