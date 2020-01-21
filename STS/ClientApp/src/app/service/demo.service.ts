import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private http: HttpClient) { }


  // Demo

   // '/api/Demo/DemoRegister'  
   // Demo        - It's a Controller 
   // DemoRegister - It's a Procedure


  registerService(data) {
    return this.http.post('/api/Demo/DemoRegister', data);
  }

  getregisterList() {
    return this.http.get('/api/Demo/DemoLogin');
  }

}
