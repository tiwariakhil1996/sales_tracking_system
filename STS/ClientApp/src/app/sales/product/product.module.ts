import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { TooltipModule, CarouselModule } from 'ngx-bootstrap';
// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot()
  ],
  declarations: [
    ProductComponent,
    AddproductComponent,
    ViewproductComponent
  ]
})
export class ProductModule { }
