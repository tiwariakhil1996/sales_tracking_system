import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

 
  // REGISTER

  RegisterService(data) {
    return this.http.post('/api/User/RegisterUser', data);
  }

  RegisterList() {
    return this.http.get('/api/User/RegisterList');
  }
  
  login(singin:LoginModel){

    return this.http.post('api/UserController/Login',LoginModel);
  }

}
