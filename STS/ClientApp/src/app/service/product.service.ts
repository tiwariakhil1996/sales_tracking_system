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

  // productList(getProductData: GetPropertyListModel) {
  //   console.log(getProductData);
  //   return this.http.post('/api/Product/ProductList', getProductData);
  // }

  each_admin_ProductList(data) {
    return this.http.post('/api/Product/each_admin_ProductList', data);
  }

  product_Images_List(id) {
    return this.http.get('/api/Product/Product_Images_List/' + id);
  }
  
  DeleteImage(id: number) {
    return this.http.delete('/api/Product/DeleteImage/' + id);
  }

  each_sales_ProductList(data) {
    return this.http.post('/api/Product/each_sales_ProductList', data);
  }

  deleteProduct(id: number) {
    return this.http.delete('/api/Product/deleteProduct/' + id);
  }
  DeleteImage(id: number) {
    return this.http.delete('/api/Product/DeleteImage/' + id);
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
