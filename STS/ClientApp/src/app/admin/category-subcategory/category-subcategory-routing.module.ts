import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AddsubcategoryComponent } from './addsubcategory/addsubcategory.component';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { ViewsubcategoryComponent } from './viewsubcategory/viewsubcategory.component';
import { CategorySubcategoryComponent } from './category-subcategory.component';



const routes: Routes = [


  {
    path: '',
    data: {
      // title: 'Category Subcategory'
    },
    children: [
      {
        path: '',
        redirectTo: 'category-subcategory'
      },
      {
        path: 'category-subcategory',
        component: CategorySubcategoryComponent,
        data: {
          title: 'Category'
        }
      },
      {
        path: 'addcategory',
        component: AddcategoryComponent,
        data: {
          title: 'Add Category'
        }
      },
      {
        path: 'addsubcategory',
        component: AddsubcategoryComponent,
        data: {
          title: 'Add Subcategory'
        }
      },
      {
        path: 'viewcategory',
        component: ViewcategoryComponent,
        data: {
          title: 'View Category'
        }
      },
      {
        path: 'viewsubcategory',
        component: ViewsubcategoryComponent,
        data: {
          title: 'View Subcategory'
        }
      },
    ]
}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorySubcategoryRoutingModule {}
