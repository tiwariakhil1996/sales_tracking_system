import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

   //call the service for AddProduct

   AddProduct(data) {

    return this.http.post('/api/Product/AddProduct',data);
  }
  ProductDetails() {
    
    return this.http.get('/api/Product/ProductDetails');
  }
}
