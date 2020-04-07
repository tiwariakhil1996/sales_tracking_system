import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ViewclientComponent } from './viewclient/viewclient.component';
import { AddclientComponent } from './addclient/addclient.component';
import { TooltipModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { ChattingComponent } from './chatting/chatting.component';
import { ChattingService } from '../../service/chatting.service';

// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClientRoutingModule,
    TooltipModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAgmJb337SljuWJnzPXRyMjiTSL1DWcBq8',
      libraries: ['places']
    }),
  ],
  declarations: [
    ClientComponent,
    ViewclientComponent,
    AddclientComponent,
    ChattingComponent
  ],
  providers: [ChattingService]
})
export class ClientModule { }
