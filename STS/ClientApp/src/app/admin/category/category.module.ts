import { CategoryComponent } from './category.component';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CategoryRoutingModule } from './category-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,  
    //it is compulsury to import the this path for routing...
    CategoryRoutingModule
  ],
  declarations: [
    CategoryComponent,
    AddcategoryComponent,
    ViewcategoryComponent
  ]
})
export class CategoryModule { }
