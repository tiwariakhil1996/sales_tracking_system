import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorySubcategoryService {

  constructor(private http: HttpClient) { }

  
  // ---------------------------- CATEGORY ---------------------------------------
  addCategory(data) {
    return this.http.post('api/Category_Subcategory/addCategory', data);
  }

  categoryList() {
    return this.http.get('/api/Category_Subcategory/CategoryList');
  }

  deleteCategory(cid: number) {
    return this.http.delete('/api/Category_Subcategory/deleteCategory/' + cid);
  }

  updateCategory(cid: number, data: any) {
    return this.http.put('/api/Category_Subcategory/updateCategory/' + cid, data);
  }

  changeStatus(id: number) {
    return this.http.put('/api/Category_Subcategory/ChangeStatusCategory/' + id, null);
  }

  active_deactive_CategoryList(){
    return this.http.get('/api/Category_Subcategory/CategoryList_ActiveDeactive');
  }





   // ---------------------------SUBCATEGORY ---------------------------------------


   addSubcategory(data) {
    return this.http.post('api/Category_Subcategory/addSubcategory', data);
  }

  subcategoryList(catid) {
    return this.http.get('/api/Category_Subcategory/SubcategoryList/' + catid);
  }

  viewsubcategoryList() {
    return this.http.get('/api/Category_Subcategory/ViewSubcategoryList/');
  }

  updateSubcategory(sid: number, data: any) {
    return this.http.put('/api/Category_Subcategory/updateSubcategory/' + sid, data);
  }
  deleteSubcategory(sid: number) {
    return this.http.delete('/api/Category_Subcategory/deleteSubcategory/' + sid);
  }
  ChangeStatusSubcategory(id: number) {
    return this.http.put('/api/Category_Subcategory/ChangeStatusSubcategory/' + id, null);
  }

}
