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
      title: 'CategorySubcategoryComponent'
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
          title: 'CategorySubcategoryComponent'
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
export class CategorySubcategoryRoutingModule {}
