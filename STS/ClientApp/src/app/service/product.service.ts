import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data) {
    return this.http.post('/api/Product/addProduct', data);
  }

  productList() {
    return this.http.get('/api/Product/ProductList');
  }

  deleteProduct(id: number) {
    return this.http.delete('/api/Product/deleteProduct/' + id);
  }

  updateProduct(id: number, data: any) {
    return this.http.put('/api/Product/updateProduct/' + id, data);
  }

  changeStatus(id: number) {
    return this.http.put('/api/Product/ChangeStatusProduct/' + id, null);
  }

  active_ProductList(){
    return this.http.get('/api/Product/ProductList_ActiveDeactive');
  }

  price(id){
    return this.http.get('/api/Product/ProductPrice/' + id);
  }
  
 
  
}
