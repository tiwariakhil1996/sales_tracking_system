import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
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
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

// Sales Components
import { SalesRegisterComponent } from './sales/register/register.component';
import { SalesLayoutComponent } from './containerSales';
import { SalesLoginComponent } from './sales/login/login.component';
import { ModalModule } from 'ngx-bootstrap';
import { NgbModal, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoallapiComponent } from './admin/demoallapi/demoallapi.component';
import { CategoryComponent } from './admin/category/category.component';
import { AddcategoryComponent } from './admin/category/addcategory/addcategory.component';
import { ViewcategoryComponent } from './admin/category/viewcategory/viewcategory.component';
import { SubcategoryComponent } from './admin/subcategory/subcategory.component';
import { AddsubcategoryComponent } from './admin/subcategory/addsubcategory/addsubcategory.component';
import { ViewsubcategoryComponent } from './admin/subcategory/viewsubcategory/viewsubcategory.component';


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
    ModalModule.forRoot(),
    NgbModule,
    NgbAlertModule,
    // HttpModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot(
      {
        timeOut: 1000,
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
    SalesRegisterComponent,
    SalesLoginComponent,
    
  ],

  // providers: [{
  //   provide: LocationStrategy,
  //   useClass: HashLocationStrategy
  // }],
  // providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
