import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ViewclientComponent } from './viewclient/viewclient.component';
import { AddclientComponent } from './addclient/addclient.component';

// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClientRoutingModule
  ],
  declarations: [
    ClientComponent,
    ViewclientComponent,
    AddclientComponent
  ]
})
export class ClientModule { }
