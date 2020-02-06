import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AddsubcategoryComponent } from './addsubcategory/addsubcategory.component';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { ViewsubcategoryComponent } from './viewsubcategory/viewsubcategory.component';
import { CategorySubcategoryRoutingModule } from './category-subcategory-routing.module';
import { CategorySubcategoryComponent } from './category-subcategory.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CategorySubcategoryRoutingModule
  ],
  declarations: [
    CategorySubcategoryComponent,
    AddcategoryComponent,
    AddsubcategoryComponent,
    ViewcategoryComponent,
    ViewsubcategoryComponent
 
  ]
})
export class CategorySubcategoryModule { }
