import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ChatsComponent } from './chats.component';
import { ChatsRoutingModule } from './chats-routing.module';
import { TabsModule } from 'ngx-bootstrap';
import { AppComponent } from '../../app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { PipeModule }    from './tools/PipeModule';
// import {Pipe,PipeTransform} from "@angular/core";

// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    // FilterPipe ,
    // PipeModule.forRoot(),
    // Pipe,
    // PipeTransform,
    ChatsRoutingModule
  ],
  declarations: [
    ChatsComponent
  ]



})
export class ChatsModule { }
