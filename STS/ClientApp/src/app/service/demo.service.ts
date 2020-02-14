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
    demoList(){
        return this.http.get('/api/Demo/DemoList');
    }
    
    deleteDemo(id: number) {
         return this.http.delete('/api/Demo/deleteDemo/' + id);
     }
    updateDemo(id: number,data:any) {
        return this.http.put('/api/Demo/updateDemo/'+id, data);
     }


   
    
}