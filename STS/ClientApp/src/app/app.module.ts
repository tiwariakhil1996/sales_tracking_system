import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
//this is Angular Google map Libraries Import this...
import { AgmCoreModule } from '@agm/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule, routes } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

// Sales Components
// import { SalesRegisterComponent } from './sales/register/register.component';
import { SalesLayoutComponent } from './containerSales';
import { SalesLoginComponent } from './sales/login/login.component';
import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { NgbModal, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { from } from 'rxjs';

// import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';


@NgModule({
  
  // This is google map libraries
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    FormsModule,
    // AngularFontAwesomeModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    // PaginationModule,
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
        timeOut: 2000,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
      }
    ),
    RouterModule.forRoot(routes),
    ChartsModule,
    // AgmMarker,
     TooltipModule.forRoot(),
    // AgmCoreModule.forRoot({apiKey: 'AIzaSyBFP65PChjDJ1qtdD9RgkseGbNA4YclE2g'})
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBaU6eEpioeuf9Nkzsd5N3OoJsDpVQdzEs'
      // libraries: ['places']
    }),
    // AgmMarker,
    // TooltipModule.forRoot(),
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
    ForgotPasswordComponent,
    ResetPasswordComponent
    
    ],

  // providers: [{
  //   provide: LocationStrategy,
  //   useClass: HashLocationStrategy
  // }],
  // schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

