import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  
  constructor(private http: HttpClient) { }

 
  // Sales REGISTER

  SalesRegisterService(data) {
    return this.http.post('/api/Sales/RegisterSales', data);

  }

  SalesLoginService(data) {
    return this.http.post('/api/Sales/SalesLogin', data);

  }

  UpdateSalesProfile(data) {
    return this.http.post('/api/Sales/updateSalesProfile', data)
  }


  SalesList() {
    return this.http.get('/api/Sales/RegisterSalesList');
  }
}
