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
    const headers = new Headers( { 'Content-Type': 'application/json' });
    // const options = new RequestOptions(  );
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
//  ----------------------------------------------  OTHERS -----------------------------------
  // ------------       Country
  countryList() {
    return this.http.get('/api/Other/CountryList');
  }
 stateList(cnid) {
    return this.http.get('/api/Other/StateList/' + cnid);
  }
 cityList(stid) {
    return this.http.get('/api/Other/CityList/' + stid);
  }
  // ---------------------------- CATEGORY ---------------------------------------
  addCategory(data){
    return this.http.post('api/Other/addCategory',data);
  }
  categoryList() {
    return this.http.get('/api/Other/CategoryList');
  }
  deleteCategory(cid:number){
    return this.http.delete('/api/Other/deleteCategory/' + cid);
  }
  updateCategory(cid: number, data:any) {
    return this.http.put('/api/Other/updateCategory/'+ cid, data);
  }
  changeStatus(id: number) {
    return this.http.put('/api/Other/ChangeStatusCategory/' + id, null);
  }
// ---------------------------SUBCATEGORY ---------------------------------------
  addSubcategory(data){
    return this.http.post('api/Other/addSubcategory',data);
  }
  subcategoryList(catid) {
    return this.http.get('/api/Other/SubcategoryList/' + catid);
  }
  viewsubcategoryList() {
    return this.http.get('/api/Other/ViewSubcategoryList/');
  }
  deleteSubcategory(sid:number){
    return this.http.delete('/api/Other/deleteSubcategory/' + sid);
  }
  updateSubcategory(sid: number, data:any) {
    return this.http.put('/api/Other/updateSubcategory/'+ sid, data);
  }
  
// ----------------------- ACTIVITY ------------------
addActivity(data){
  return this.http.post('api/Activity/addActivity',data);
}
activityList() {
  return this.http.get('/api/Activity/ActivityList');
}
deleteActivity(aid: number) {
  return this.http.delete('/api/Activity/deleteActivity/' + aid);
}
updateActivity(aid: number,data:any) {
  return this.http.put('/api/Activity/updateActivity/' + aid,data);
}

}
