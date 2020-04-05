import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private http: HttpClient) { }

    send_msg(data) {
        return this.http.post('api/Admin/sendmessage', data);
      }

      get_chats(data) {
        return this.http.post('/api/Admin/getchats', data);
      }

      get_sales_chats(data) {
        return this.http.post('/api/Sales/getsaleschats', data);
      }

      // get_chats(id: number) {
      //   return this.http.get('/api/Admin/getchats/' + id);
      // }

      // get_chats(id: number,data: any) {
      //   return this.http.get('/api/Admin/getchats/' + id,data);
      // }

}