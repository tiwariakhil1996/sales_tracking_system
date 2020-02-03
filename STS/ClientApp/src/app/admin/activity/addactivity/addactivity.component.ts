import { SalesService } from './../../../service/sales.service';
import { Component, OnInit } from '@angular/core';
import { AddactivityModel, productModel, clientModel, salesregisterModel } from '../../../model/model';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent implements OnInit {

  Addactivity= new AddactivityModel();
  AddactivityDetails:AddactivityModel[]=[];
  
  product = new productModel();
  productDetails: productModel[] = [];

  client = new clientModel();
  clientDetails: clientModel[] = [];

  register = new salesregisterModel();

  salesDetails: salesregisterModel[] = [];

  constructor(private productService: CommonService,private salesService:SalesService) { 
    this.productList();
    this.clientList();
    this.salesList();
  }

  ngOnInit() {
    
  }

  productList() {
    this.productService.productList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ProductList) {
          this.productDetails = data.ProductList;
        }
      }
    }, (err) => {

    });
  }
 clientList() {
    this.productService.clientList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ClientList) {
          this.clientDetails = data.ClientList;
        }
      }
    }, (err) => { console.log(err); });
  }

  salesList() {
    this.salesService.salesList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.RegisterSalesList) {
          this.salesDetails = data.RegisterSalesList;
        }
      }
    }, (err) => { console.log(err); });
  }


  // selectDate($scope, $filter){
  //   $scope.date_Rdv = $filter('date')(Date.now(), 'yyyy-MM-dd');
  // }
}
