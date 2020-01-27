import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  // ---------------  Product

  addProduct(data) {
    return this.http.post('/api/Product/addProduct', data);
  }


  productList() {
    return this.http.get('/api/Product/ProductList');
  }




  // -----------------  Client

  addClient(data) {
    return this.http.post('/api/Client/addClient', data);
  }

  clientList() {
    return this.http.get('/api/Client/ClientList');
  }

  //  deleteClient(data) {
  //   return this.http.post('/api/Client/deleteClient',data);

  deleteClient(id: number) {
    return this.http.delete('/api/Client/deleteClient/' + id);
  }
}
