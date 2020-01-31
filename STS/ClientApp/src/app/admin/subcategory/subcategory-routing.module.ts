import { ViewsubcategoryComponent } from './viewsubcategory/viewsubcategory.component';
import { AddsubcategoryComponent } from './addsubcategory/addsubcategory.component';
import { SubcategoryComponent } from './subcategory.component';

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
        title: 'SubCategory'
      },
      children: [
        {
          path: '',
          redirectTo: 'subcategory'
        },
        {
          path: 'subcategory',
          component: SubcategoryComponent,
          data: {
            title: 'Subcategory'
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
export class SubcategoryRoutingModule {}
