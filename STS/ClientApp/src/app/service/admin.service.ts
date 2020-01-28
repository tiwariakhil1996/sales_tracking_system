import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

 
  // REGISTER

  // RegisterService(data) {
  //   return this.http.post('/api/User/RegisterUser', data);

  // }

  // RegisterList() {
  //   return this.http.get('/api/User/RegisterList');
  // }

  AdminRegisterService(data) {
    return this.http.post('/api/Admin/AdminRegister', data);

  }

  AdminLogin(data) {
    return this.http.post('/api/Admin/AdminLogin',data);
  }

  UpdateVendorProfile(data) {
    return this.http.post('/api/Vendor/UpdateVendorProfile', data)
  }


}
