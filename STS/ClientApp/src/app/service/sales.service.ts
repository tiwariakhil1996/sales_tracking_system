import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  
  constructor(private http: HttpClient) { }

 
  // REGISTER

  RegisterService(data) {
    return this.http.post('/api/User/RegisterUser', data);

  }

  RegisterList() {
    return this.http.get('/api/User/RegisterList');
  }
}
