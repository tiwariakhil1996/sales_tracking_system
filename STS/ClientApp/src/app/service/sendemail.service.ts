import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class SendEmailService {
    constructor(
        private http: HttpClient
    ) { }
    //api calling send mail
    //Mail is Controller name and SendMail is Store Procedure name
    sendmail(data) {
        return this.http.post('/api/Mail/SendMail', data);
    }
    send_sales_mail(data) {
        return this.http.post('/api/Mail/SendMail_Sales', data);
    }
}