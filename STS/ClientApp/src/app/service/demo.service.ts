import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })

export class DemoService {
    constructor(
        private http:HttpClient
    ){}
     
    //api demo
    addDemo(data){
        return this.http.post('/api/Demo/AddDemo',data);
    }
}