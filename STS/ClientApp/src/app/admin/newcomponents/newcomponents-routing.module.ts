import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewcomponentsComponent } from './newcomponents.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AddsubcategoryComponent } from './addsubcategory/addsubcategory.component';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { ViewsubcategoryComponent } from './viewsubcategory/viewsubcategory.component';


const routes: Routes = [


  {
    path: '',
    data: {
      title: 'NewComponents'
    },
    children: [
      {
        path: '',
        redirectTo: 'newcomponents'
      },
      {
        path: 'newcomponents',
        component: NewcomponentsComponent,
        data: {
          title: 'NewComponents'
        }
      },
      {
        path: 'addcategory',
        component: AddcategoryComponent,
        data: {
          title: 'Add_Category'
        }
      },
      {
        path: 'addsubcategory',
        component: AddsubcategoryComponent,
        data: {
          title: 'Add_Subcategory'
        }
      },
      {
        path: 'viewcategory',
        component: ViewcategoryComponent,
        data: {
          title: 'View_Category'
        }
      },
      {
        path: 'viewsubcategory',
        component: ViewsubcategoryComponent,
        data: {
          title: 'View_Subcategory'
        }
      },
    ]
}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewcomponentsRoutingModule {}
