import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

   //Product

   addProduct(data) {
    return this.http.post('/api/Product/addProduct', data);
  }
  
}
