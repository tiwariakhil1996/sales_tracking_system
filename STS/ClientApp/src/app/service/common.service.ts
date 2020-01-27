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

  deleteProduct(id: number) {
    return this.http.delete('/api/Product/deleteProduct/' + id);
  }

  updateProduct(id: number, data:any) {
    return this.http.put('/api/Product/updateProduct/'+ id, data);
  }


  // -----------------  Client

  addClient(data) {
    return this.http.post('/api/Client/addClient', data);
  }

  clientList() {
    return this.http.get('/api/Client/ClientList');
  }

  deleteClient(id: number) {
    return this.http.delete('/api/Client/deleteClient/' + id);
  }

  updateClient(id: number,data:any) {
    return this.http.put('/api/Client/updateClient/'+id, data);
  }
}
