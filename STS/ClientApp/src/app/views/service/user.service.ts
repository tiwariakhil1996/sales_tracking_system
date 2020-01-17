import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //MAP

  addRegister(data) {
    return this.http.post('/api/SampleData/ProcRegister', data);
  }

  RegisterList() {
    return this.http.get('/api/SampleData/RegisterList');
  }

  //REGISTER
  Signup(data) {
    return this.http.post('/api/User/ProSignup', data);
  }

  SignupList() {
    return this.http.get('/api/User/ProLogin');
  }

}
