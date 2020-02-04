import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NewcomponentsComponent } from './newcomponents.component';
import { NewcomponentsRoutingModule } from './newcomponents-routing.module';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AddsubcategoryComponent } from './addsubcategory/addsubcategory.component';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { ViewsubcategoryComponent } from './viewsubcategory/viewsubcategory.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NewcomponentsRoutingModule
  ],
  declarations: [
    NewcomponentsComponent,
    AddcategoryComponent,
    AddsubcategoryComponent,
    ViewcategoryComponent,
    ViewsubcategoryComponent
 
  ]
})
export class NewcomponentsModule { }
