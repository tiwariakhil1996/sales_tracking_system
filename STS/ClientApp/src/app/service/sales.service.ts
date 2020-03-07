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
    return this.http.post('/api/Sales/updateSalesProfile', data);
  }


  changePassword(id: number, data: any) {
    return this.http.put('/api/Sales/changesalesPassword/' + id, data);
  }

  SalesList() {
    return this.http.get('/api/Sales/RegisteredSalesList');
  }

  RegisteredSalesList(data) {
    return this.http.post('/api/Sales/RegisteredSalesList', data);
  }
  
  deleteSales(id: number) {
    return this.http.delete('/api/Sales/deleteSales/' + id);
  }

  changeStatus(id: number) {
    return this.http.put('/api/Sales/ChangeStatusSales/' + id, null);
  }

  active_SalesList(){
    return this.http.get('/api/Sales/SalesList_ActiveDeactive');
  }

  Refresh_Sales_Location(data) {
    return this.http.post('/api/Sales/Refresh_Sales_Location', data);
  }

  SalesList_dropdown(data) {
    return this.http.post('/api/Sales/SalesList_dropdown', data);
  }
}
