import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  addClient(data) {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    // const options = new RequestOptions(  );
    return this.http.post('/api/Client/addClient', data);
  }

  clientList() {
    return this.http.get('/api/Client/ClientList');
  }

  each_admin_ClientList(data) {
    return this.http.post('/api/Client/each_admin_ClientList', data);
  }

  each_sales_ClientList(data) {
    return this.http.post('/api/Client/each_sales_ClientList', data);
  }

  deleteClient(id: number) {
    return this.http.delete('/api/Client/deleteClient/' + id);
  }

  updateClient(id: number, data: any) {
    return this.http.put('/api/Client/updateClient/' + id, data);
  }

  changeStatus(id: number) {
    return this.http.put('/api/Client/ChangeStatusClient/' + id, null);
  }

  active_ClientList(){
    return this.http.get('/api/Client/ClientList_ActiveDeactive');
  }

}
