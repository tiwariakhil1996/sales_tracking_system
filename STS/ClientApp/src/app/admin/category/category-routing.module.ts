import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { CategoryComponent } from './category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// const routes: Routes = [
//   {
//     path: '',
//     component: DemoallapiComponent,
//     data: {
//       title: 'DEMOALLAPI'
//     }
//   }
// ];
const routes: Routes = [
  //   {
  //     path: '',
  //     component: ActivityComponent,
  //     data: {
  //       title: 'Activity'
  //     }
  //   }
  
    {
      path: '',
      data: {
        title: 'Category'
      },
      children: [
        {
          path: '',
          redirectTo: 'category'
        },
        {
          path: 'category',
          component: CategoryComponent,
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
          path: 'viewcategory',
          component: ViewcategoryComponent,
          data: {
            title: 'View Category'
          }
        },
      ]
  }
  ];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
