import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../../../service/sales.service';
import { ProductService } from '../../../service/product.service';
import { ActivityService } from '../../../service/activity.service';
import { ClientService } from '../../../service/client.service';
import { salesregisterModel } from '../../../model/sales';
import { activityModel } from '../../../model/activity';
import { productModel } from '../../../model/product';
import { clientModel } from '../../../model/client';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent implements OnInit {
  activity = new activityModel();
  activityDetails: activityModel[] = [];
  sales = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];
  product = new productModel();
  productDetails: productModel[] = [];
  client = new clientModel();
  clientDetails: clientModel[] = [];

  constructor(private router: Router,
    private activityService: ActivityService,
    private clientService: ClientService,
    private salesService: SalesService,
    private productService: ProductService) {

    // this.productList();
    this.active_ProductList();
    // this.clientList();
    this.active_ClientList();
    this.SalesList();
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

  active_ProductList() {
    this.productService.active_ProductList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ProductList_ActiveDeactive) {
          this.productDetails = data.ProductList_ActiveDeactive;
        }
      }
    }, (err) => {

    });
  }

  active_ClientList() {
    this.clientService.active_ClientList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ClientList_ActiveDeactive) {
          this.clientDetails = data.ClientList_ActiveDeactive;
        }
      }
    }, (err) => {
    });
  }

  // clientList() {
  //   this.clientService.clientList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.ClientList) {
  //         this.clientDetails = data.ClientList;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

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

    });
  }



  resetForm() {
    this.activity.productId = null;
    this.activity.clientId = null;
    this.activity.salesId = null;
    this.activity.contact = null;
    this.activity.latLong = null;
    this.activity.appointmentDate = null;
  }

  viewActivityForm() {
    this.router.navigate(['/admin/activity/currentactivity']);
  }

}
