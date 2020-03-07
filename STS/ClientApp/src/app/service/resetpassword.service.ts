import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class ResetPasswordService{
    constructor(
        private http: HttpClient
    ) { }

  
    // sendmail(data) {
    //     return this.http.post('/api/Mail/SendMail',data);
    // }
    ResetPassword(ResetPassword_id: number, data: any) {
        return this.http.put('/api/ResetPassword/ResetPasswordAdmin/' + ResetPassword_id, data);
      }

}