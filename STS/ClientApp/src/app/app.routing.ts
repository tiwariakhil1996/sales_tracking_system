import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, NavigationEnd } from '@angular/router';

// Admin Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './admin/error/404.component';
import { P500Component } from './admin/error/500.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';




// // Sales
import { SalesLayoutComponent } from './containerSales';

import { SalesRegisterComponent } from './sales/register/register.component';
import { SalesLoginComponent } from './sales/login/login.component';
import { AuthGuard } from '../security/auth-guard';


export const routes: Routes = [

  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // },

  //This is default routing and it is first open the sales login ant time... 
  {
    path: '',
    redirectTo: 'sales/login',
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
    path: 'admin',
    component: DefaultLayoutComponent,

    data: {
      title: 'Admin'
    },

    children: [

      {
        path: 'dashboard',
        loadChildren: () => import('./admin/dashboard/dashboard.module').then(m => m.DashboardModule)
        // canActivate: [AuthGuard]
      },
      {
        path: 'product',
        loadChildren: () => import('./admin/product/product.module').then(m => m.ProductModule)
      },

      {
        path: 'assign',
        loadChildren: () => import('./admin/assign/assign.module').then(m => m.AssignModule)
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
        path: 'base',
        loadChildren: () => import('./admin/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./admin/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./admin/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./admin/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./admin/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./admin/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },


  //-----------------------------------Sales Routing------------------------------------
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

  //sales dashboard

  {
    path: 'sales',
    component: SalesLayoutComponent,
    data: {
      title: 'sales'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./sales/dashboard/dashboard.module').then(m => m.DashboardModule)
        // canActivate: [AuthGuard]

      },
      {
        path: 'product',
        loadChildren: () => import('./sales/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'assign',
        loadChildren: () => import('./sales/assign/assign.module').then(m => m.AssignModule)
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
      // {
      //   path: 'demo',
      //   loadChildren: () => import('./sales/demo/demo.module').then(m => m.DemoModule)
      // }

    ]
  },






  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
