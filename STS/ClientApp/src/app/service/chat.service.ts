import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EventEmitter} from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Message } from '../model/message';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

    constructor(private http: HttpClient) {
      this.createConnection();
      this.registerOnServerEvents();
      this.startConnection();
     }

    // send_msg(data) {
    //     return this.http.post('api/Admin/sendmessage', data);
    //   }

    send_msg(data) {
      return this.http.post('api/Chat/sendmessage', data);
    }

    get_chats(data) {
      return this.http.post('/api/Chat/getchats', data);
    }

   unread_messages(data) {
      return this.http.post('/api/Chat/unread_messages', data);
    }

    // deleteMsg(id: number,data) {
    //   return this.http.delete('/api/Chat/deleteMsg/' + id,data);
    // }

 deleteMsg(id: number,data) {
      return this.http.put('/api/Chat/deleteMsg/' + id,data);
    }


      // get_chats(data) {
      //   return this.http.post('/api/Admin/getchats', data);
      // }

      // get_sales_chats(data) {
      //   return this.http.post('/api/Sales/getsaleschats', data);
      // }

      get_admin_status(data) {
        return this.http.post('/api/Sales/getadminstatus', data);
      }


      // get_chats(id: number) {
      //   return this.http.get('/api/Admin/getchats/' + id);
      // }

      // get_chats(id: number,data: any) {
      //   return this.http.get('/api/Admin/getchats/' + id,data);
      // }

      
      
  sendMessage(message: Message) {
    this._hubConnection.invoke('NewMessage', message);
  }


  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
    .withUrl(location.origin + '/MessageHub')  
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('MessageReceived', (data: any) => {
      this.messageReceived.emit(data);
    });
  }

}