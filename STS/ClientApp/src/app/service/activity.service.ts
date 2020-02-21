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

  activityList_while_adding() {
    return this.http.get('/api/Activity/ActivityList_while_adding');
  }
  deleteActivity(aid: number) {
    return this.http.delete('/api/Activity/deleteActivity/' + aid);
  }

  updateActivity(aid: number, data: any) {
    return this.http.put('/api/Activity/updateActivity/' + aid, data);
  }

  each_sales_activityList(data) {
    return this.http.post('/api/Activity/each_sales_activityList', data);
  }

  each_admin_activityList(data) {
    return this.http.post('/api/Activity/each_admin_activityList', data);
  }

  assigned_activityList(data) {
    return this.http.post('/api/Activity/assigned_activityList', data);
  }

  updateInprogress(aid: number, data: any) {
    return this.http.put('/api/Activity/updateInprogress/' + aid, data);
  }

  activity_history(aid: number, data: any){
    return this.http.put('/api/Activity/activity_history/' + aid, data);
  }

  updateToFollowup(aid: number, data: any) {
    return this.http.put('/api/Activity/updateToFollowup/' + aid, data);
  }


  updateToClose(aid: number, data: any) {
    return this.http.put('/api/Activity/updateToClose/' + aid, data);
  }

  updateToCancel(aid: number, data: any) {
    return this.http.put('/api/Activity/updateToCancel/' + aid, data);
  }

  latest_added_Activity(){
    return this.http.get('/api/Activity/addActivity');
  }


}
