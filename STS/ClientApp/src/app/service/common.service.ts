import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

   //call the service for AddProduct

   addProduct(data) {

    return this.http.post('/api/Product/AddProduct',data);
  }
  ProductDetails() {
    
    return this.http.get('/api/Product/ProductDetails');
  }


   productList() {
    return this.http.get('/api/Product/ProductList');
   }

  //Client

  addClient(data) {
    return this.http.post('/api/Client/addClient', data);
  }

  clientList() {
    return this.http.get('/api/Client/ClientList');
   }
}
