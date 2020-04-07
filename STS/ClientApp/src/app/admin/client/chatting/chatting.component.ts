import { Component, OnInit } from '@angular/core';

import { NgZone } from '@angular/core';
// import { Message } from '../models/Message';
// import { ChatService } from '../services/chat.service';
import { Message } from '../../../model/message';
import { ChattingService } from '../../../service/chatting.service';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})

export class ChattingComponent implements OnInit {

  // constructor() { }

 

  
  title = 'ClientApp';
  txtMessage: string = '';
  uniqueID: string = new Date().getTime().toString();
  messages = new Array<Message>();
  message = new Message();
  constructor(
    private chatService: ChattingService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
  }

  ngOnInit() {
  }

  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = 'sent';
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }
  
  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.uniqueID) {
          message.type = 'received';
          this.messages.push(message);
        }
      });
    });
  }

}
