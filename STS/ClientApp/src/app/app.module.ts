
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './admin/error/404.component';
import { P500Component } from './admin/error/500.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  SalesLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule
 
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

// Sales Components
import { SalesRegisterComponent } from './sales/register/register.component';
import { SalesLayoutComponent } from './containerSales';
import { SalesLoginComponent } from './sales/login/login.component';
import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    FormsModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    HttpClientModule,
    //this module for used the edit popup...
    NgbModule,
    NgbAlertModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
      }
    ),

    ChartsModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,

    // SalesComponents
    SalesRegisterComponent,
    SalesLoginComponent
  ],

  // providers: [{
  //   provide: LocationStrategy,
  //   useClass: HashLocationStrategy
  // }],
  // providers: [AuthGuard],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
