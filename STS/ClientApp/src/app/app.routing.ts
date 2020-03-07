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

import { SalesRegisterComponent } from './sales/register/register.component';
import { SalesLoginComponent } from './sales/login/login.component';

import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { ResetPasswordFormComponent } from './admin/reset-password-form/reset-password-form.component';


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
    path: 'admin/reset-password-form',
    component: ResetPasswordFormComponent,
    data: {
      title: 'Forgot Password Form'
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
        path: 'category-subcategory',
        loadChildren: () => import('./admin/category-subcategory/category-subcategory.module').then(m => m.CategorySubcategoryModule)
      },
      // {
      //   path: 'base',
      //   loadChildren: () => import('./admin/base/base.module').then(m => m.BaseModule)
      // },
      // {
      //   path: 'icons',
      //   loadChildren: () => import('./admin/icons/icons.module').then(m => m.IconsModule)
      // },
      // {
      //   path: 'notifications',
      //   loadChildren: () => import('./admin/notifications/notifications.module').then(m => m.NotificationsModule)
      // },
      // {
      //   path: 'theme',
      //   loadChildren: () => import('./admin/theme/theme.module').then(m => m.ThemeModule)
      // },
      // {
      //   path: 'widgets',
      //   loadChildren: () => import('./admin/widgets/widgets.module').then(m => m.WidgetsModule)
      // }
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
      }
     ] },






  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
