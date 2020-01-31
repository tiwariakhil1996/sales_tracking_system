import { SubcategoryRoutingModule } from './subcategory-routing.module';
import { ViewsubcategoryComponent } from './viewsubcategory/viewsubcategory.component';
import { AddsubcategoryComponent } from './addsubcategory/addsubcategory.component';
import { SubcategoryComponent } from './subcategory.component';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,  
    //it is compulsury to import the this path for routing...
    SubcategoryRoutingModule
  ],
  declarations: [
    SubcategoryComponent,
    AddsubcategoryComponent,
    ViewsubcategoryComponent
    
  ]
})
export class SubcategoryModule { }
