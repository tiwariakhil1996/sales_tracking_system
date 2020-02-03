import { Component, OnInit } from '@angular/core';
import { activityModel, productModel, clientModel, salesregisterModel } from '../../../model/model';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { SalesService } from '../../../service/sales.service';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent implements OnInit {

  activity = new activityModel();
  activityDetails: activityModel[]=[];

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[]=[];

  product = new productModel();
  productDetails: productModel[] = [];

  client = new clientModel();
  clientDetails: clientModel[] = [];

  constructor(private router: Router,private activityService: CommonService,  private salesService: SalesService,) {

    this.productList();
    this.clientList();
    this.SalesList();
   }

  ngOnInit() {
  }

 
  productList() {
    this.activityService.productList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ProductList) {
          this.productDetails = data.ProductList;
        }
      }
    }, (err) => {

    });
  }


  clientList() {
    this.activityService.clientList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ClientList) {
          this.clientDetails = data.ClientList;
        }
      }
    }, (err) => {

    });
  }

  SalesList(){
    this.salesService.SalesList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.RegisteredSalesList) {
          this.salesDetails = data.RegisteredSalesList;
        }
      }
    }, (err) => {

    });
  }


  submitForm() {
    this.activityService.addActivity(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Activity added sucesfully');
      }
      this.activity = new activityModel();
    }, (err) => {

       console.log(err);

    });
  }


}
