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

  deleteActivity(aid: number) {
    return this.http.delete('/api/Activity/deleteActivity/' + aid);
  }

  updateActivity(aid: number, data: any) {
    return this.http.put('/api/Activity/updateActivity/' + aid, data);
  }

  each_sales_activityList(data) {
    return this.http.post('/api/Activity/each_sales_activityList', data);
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

  Activityhistoryupdate(aid: number, data: any) {
    return this.http.put('/api/Activity/Activity_history/' +aid, data);
  }


  // changeStatus_ToInprogress(aid: number) {
  //   return this.http.put('/api/Activity/ChangeStatusActivity_Inprogress/' + aid, null);
  // }

  // changeStatus_ToFollowup(aid: number) {
  //   return this.http.put('/api/Activity/ChangeStatusActivity_Followup/' + aid, null);
  // }

  // changeStatus_ToClose(aid: number) {
  //   return this.http.put('/api/Activity/ChangeStatusActivity_Close/' + aid, null);
  // }
  
  // changeStatus_ToCancel(aid: number) {
  //   return this.http.put('/api/Activity/ChangeStatusActivity_Cancel/' + aid, null);
  // }

}
