import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  // REGISTER
  AdminRegisterService(data) {
    return this.http.post('/api/Admin/AdminRegister', data);

  }

  AdminLogoutService(id: number) {
    return this.http.put('/api/Admin/AdminLogout/' + id, null);
  }

  AdminLogin(data) {
    return this.http.post('/api/Admin/AdminLogin', data);
  }

  UpdateAdminProfile(data) {
    return this.http.post('/api/Admin/updateAdminProfile', data)
  }

  changePassword(id: number, data: any) {
    return this.http.put('/api/Admin/changeadminPassword/' + id, data);
  }

}
