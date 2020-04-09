import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Admin Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './admin/error/404.component';
import { P500Component } from './admin/error/500.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { ProductComponent } from './admin/product/product.component';



// Sales Containers
import { SalesLayoutComponent } from './containerSales';

// import { SalesRegisterComponent } from './sales/register/register.component';
import { SalesLoginComponent } from './sales/login/login.component';

import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';

import { SalesRegisterComponent } from './admin/sales-register/sales-register.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { ResetPasswordSalesComponent } from './sales/reset-password-sales/reset-password-sales.component';
import { ForgotPasswordSalesComponent } from './sales/forgot-password-sales/forgot-password-sales.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/sales/login',
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

  // {
  //   path: 'admin/chat',
  //   component: ChatComponent,
  //   data: {
  //     title: 'Chat'
  //   }
  // },

  {
    path: 'admin/sales-register',
    component: SalesRegisterComponent,
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
    path: 'admin/reset-password',
    component: ResetPasswordComponent,
    data: {
      title: 'Forgot Password Page'
    }
  },


  {
    path: 'sales/forgot-password-sales',
    component: ForgotPasswordSalesComponent,
    data: {
      title: 'Forgot Password Page'
    }
  },

  {
    path: 'sales/reset-password-sales',
    component: ResetPasswordSalesComponent,
    data: {
      title: 'Forgot Password Page'
    }
  },

  {
    path: 'admin',
    component: DefaultLayoutComponent,

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
        path: 'chat',
        loadChildren: () => import('./admin/chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: 'category-subcategory',
        loadChildren: () => import('./admin/category-subcategory/category-subcategory.module').then(m => m.CategorySubcategoryModule)
      },
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

    ]
  },






  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
