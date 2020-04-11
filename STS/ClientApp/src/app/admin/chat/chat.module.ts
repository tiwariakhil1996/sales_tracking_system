import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { TabsModule } from 'ngx-bootstrap';
import { AppComponent } from '../../app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChattingService } from '../../service/chatting.service';
// import { PipeModule }    from './tools/PipeModule';
// import {Pipe,PipeTransform} from "@angular/core";
// import { ToastrModule } from 'ngx-toastr';

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
  //   ToastrModule.forRoot({
  //   timeOut: 10000,
  //   positionClass: 'toast-bottom-right',
  //   preventDuplicates: true
  // }),
    ChatRoutingModule
  ],
  declarations: [
    ChatComponent
  ],
  providers: [ChattingService]



})
export class ChatModule { }
