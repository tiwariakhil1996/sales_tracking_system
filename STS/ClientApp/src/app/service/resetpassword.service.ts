import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class ResetPasswordService{
    constructor(
        private http: HttpClient
    ) { }

    ResetPassword(Token: any, data: any) {
        return this.http.put('/api/ResetPassword/ResetPasswordAdmin/' + Token, data);
      }

      ResetPasswordSales(Token: any, data: any) {
        return this.http.put('/api/ResetPassword/ResetPasswordSales/' + Token, data);
      }
}