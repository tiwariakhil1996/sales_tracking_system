import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../../../service/sales.service';
import { ProductService } from '../../../service/product.service';
import { ActivityService } from '../../../service/activity.service';
import { ClientService } from '../../../service/client.service';
import { salesregisterModel } from '../../../model/sales';
import { activityModel, addactivityModel, activityList_while_addingModel, latestactivityModel } from '../../../model/activity';
import { productModel, productpriceModel } from '../../../model/product';
import { clientModel } from '../../../model/client';
import { ToastrService } from 'ngx-toastr';
import { registerModel } from '../../../model/admin';
@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent implements OnInit {
  user = new registerModel();

  activity = new addactivityModel();
  activityDetails: addactivityModel[] = [];

  latestactivity = new latestactivityModel();
  latestactivityDetails: latestactivityModel[] = [];

  activityList_adding: activityList_while_addingModel[] = [];

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];
  product = new productModel();
  productDetails: productModel[] = [];

  product_price = new productpriceModel();
  product_priceDetails: productpriceModel[] = [];

  client = new clientModel();
  clientDetails: clientModel[] = [];
  
  isShow = true;
 
 

  constructor(private router: Router,
    private activityService: ActivityService,
    private clientService: ClientService,
    private salesService: SalesService,
    private productService: ProductService,
    private toastr: ToastrService) {
    // this.productList();
    this.active_ProductList();
    // this.clientList();
    this.active_ClientList();
    this.SalesList();
    this.activityList_while_adding();
    // console.log(this.product_priceDetails);

    this.latest_added_activity();
    console.log(this.latestactivityDetails);
    
    
  }
  ngOnInit() {
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
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

  onProductChange(id) {
    this.price(id);

  }

  price(id) {
    this.productService.price(id).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ProductPrice) {
          this.product_priceDetails = data.ProductPrice;
        }
      }
    }, (err) => {

      console.log(err);
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
  SalesList() {
    this.salesService.SalesList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.RegisteredSalesList) {
          this.salesDetails = data.RegisteredSalesList;
        }
      }
    }, (err) => {

    });
  }

  addMoreproducts() {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.activity.createdby = this.user.id;
    // console.log(this.activity.createdby);

    this.activityService.addActivity(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // localStorage.setItem('activityDetail', JSON.stringify(data.activityDetail[0] || {}));

        this.toastr.success('Activity is added Successfully', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
      // this.activity = new addactivityModel();
    }, (err) => {

    });
  }
  submitForm() {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.activity.createdby = this.user.id;
    console.log(this.activity.createdby);

    this.activityService.addActivity(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // localStorage.setItem('activityDetail', JSON.stringify(data.activityDetail[0] || {}));

        this.toastr.success('Activity is added Successfully', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
      // this.activity = new addactivityModel();
    }, (err) => {
      console.log(err);
    });
  }

  latest_added_activity() {
    this.activityService.latest_added_Activity().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.addActivity) {
          this.latestactivityDetails = data.addActivity;
          console.log(this.latestactivityDetails);
        }
      }
    }, (err) => {

    });
  }

  activityList_while_adding() {
    this.activityService.activityList_while_adding().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ActivityList_while_adding) {
          this.activityList_adding = data.ActivityList_while_adding;
        }
      }
    }, (err) => {

    });
  }

  resetForm() {
    this.activity.productId = null;
    this.activity.clientId = null;
    this.activity.salesId = null;
    this.activity.contact = null;
    this.activity.latitude = null;
    this.activity.longitude = null;
    this.activity.appointmentDate = null;
  }
  viewActivityForm() {
    this.router.navigate(['/admin/activity/currentactivity']);
  }
  activityList() {
    this.activityService.activityList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ActivityList) {
          this.activityDetails = data.ActivityList;
        }
      }
    }, (err) => {
    });
  }
}
