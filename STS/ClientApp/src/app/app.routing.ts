import { DemoallapiComponent } from './admin/demoallapi/demoallapi.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Admin Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './admin/error/404.component';
import { P500Component } from './admin/error/500.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';



// Sales Containers
import { SalesLayoutComponent } from './containerSales';

import { SalesRegisterComponent } from './sales/register/register.component';
import { SalesLoginComponent } from './sales/login/login.component';
import { AuthGuard } from './auth.guard';
import { SalesGuard } from './sales.guard';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';


export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/sales/login',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    redirectTo: '/admin/login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },



  // --------------------------------------- ADMIN ROUTING -----------------------
  {
    path: 'admin/login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },

  {
    path: 'admin/register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },


  {
    path: 'admin/forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password Page'
    }
  },


  {
    path: 'admin',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./admin/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./admin/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'salesdata',
        loadChildren: () => import('./admin/salesdata/salesdata.module').then(m => m.SalesdataModule)
      },
      {
        path: 'client',
        loadChildren: () => import('./admin/client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'activity',
        loadChildren: () => import('./admin/activity/activity.module').then(m => m.ActivityModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./admin/map/map.module').then(m => m.MapModule)
      },
      {
        path: 'category-subcategory',
        loadChildren: () => import('./admin/category-subcategory/category-subcategory.module').then(m => m.CategorySubcategoryModule)
      },
      {
        path: 'demoallapi',
        loadChildren: () => import('./admin/demoallapi/demoallapi.module').then(m => m.DemoallapiModule)
      }
    ]
  },



  // ------------------------------------------    SALES ROUTING  ---------------------
  {
    path: 'sales/login',
    component: SalesLoginComponent,
    data: {
      title: 'Login Page'
    }
  },


  {
    path: 'sales/register',
    component: SalesRegisterComponent,
    data: {
      title: 'Register Page'
    }
  },


  {
    path: 'sales',
    component: SalesLayoutComponent,
    canActivate: [SalesGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./sales/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./sales/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'client',
        loadChildren: () => import('./sales/client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'activity',
        loadChildren: () => import('./sales/activity/activity.module').then(m => m.ActivityModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./sales/map/map.module').then(m => m.MapModule)
      }
     ] },






  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
