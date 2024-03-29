import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  addActivity(data) {
    return this.http.post('api/Activity/addActivity', data);
  }

  activityList() {
    return this.http.get('/api/Activity/ActivityList');
  }

  activity_Details(aid) {
    return this.http.get('/api/Activity/activity_Details/' + aid);
  }

  activity_productList(aid) {
    return this.http.get('/api/Activity/Activity_ProductList/' + aid);
  }

  activity_Location(aid) {
    return this.http.get('/api/Activity/Activity_Location/' + aid);
  }

  deleteActivity(aid: number) {
    return this.http.delete('/api/Activity/deleteActivity/' + aid);
  }

  deleteProduct(productId: number) {
    return this.http.delete('/api/Activity/deleteActivity_Product/' + productId);
  }

  updateActivity(aid: number, data: any) {
    return this.http.put('/api/Activity/updateActivity/' + aid, data);
  }

  update_n_addProducts(aid: number, data: any) {
    return this.http.put('/api/Activity/update_n_addProducts/' + aid, data);
  }

  update_old_Products(aid: number, data: any) {
    return this.http.put('/api/Activity/update_old_products/' + aid, data);
  }

  each_sales_activityList(data) {
    return this.http.post('/api/Activity/each_sales_activityList', data);
  }

  each_admin_activityList(data) {
    return this.http.post('/api/Activity/each_admin_activityList', data);
  }
  each_admins_sales_Location(data) {
    return this.http.post('/api/Activity/each_admins_sales_Location', data);
  }

  assigned_activityList(data) {
    return this.http.post('/api/Activity/assigned_activityList', data);
  }

  updateInprogress(aid: number, data: any) {
    return this.http.put('/api/Activity/updateInprogress/' + aid, data);
  }

  activity_history(aid: number, data: any) {
    return this.http.put('/api/Activity/activity_history/' + aid, data);
  }

  updateToFollowup(aid: number, data: any) {
    return this.http.put('/api/Activity/updateToFollowup/' + aid, data);
  }

  updateToPending(aid: number, data: any) {
    return this.http.put('/api/Activity/updateToPending/' + aid, data);
  }


  updateToClose(aid: number, data: any) {
    return this.http.put('/api/Activity/updateToClose/' + aid, data);
  }

  updateToCancel(aid: number, data: any) {
    return this.http.put('/api/Activity/updateToCancel/' + aid, data);
  }

}
