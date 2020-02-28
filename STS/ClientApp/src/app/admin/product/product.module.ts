import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { ModalModule } from 'ngx-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductImagesComponent } from './product-images/product-images.component';
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
    ViewproductComponent,
    ProductImagesComponent
  ]
})
export class ProductModule { }
