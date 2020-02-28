import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../../../service/sales.service';
import { ProductService } from '../../../service/product.service';
import { ActivityService } from '../../../service/activity.service';
import { ClientService } from '../../../service/client.service';
import { salesregisterModel } from '../../../model/sales';
import { activityModel, addactivityModel, activityList_while_addingModel, latestactivityModel, addproductListingModel } from '../../../model/activity';
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

  addproductlist = new addproductListingModel;
  addproductlistDetails: addproductListingModel[] = [];

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

  private sum = 0;
  private value;

  RoleJason = {
    ROle: [0, 1],
    Component: 'AddComponent'
  };

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
    // this.activityList_while_adding();
    // console.log(this.product_priceDetails);

  }

  ngOnInit() {
    this.addMoreproducts();
    this.static_price();
    this.checkRole(this.RoleJason);
  }

  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      // console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['admin/login']);
      }
    }
  }
  // toggleDisplay() {
  //   this.isShow = !this.isShow;
  // }



  // values = '';

  // onKey(event: any) {
  //   this.values += event.target.value + ;
  // }

  //   total(bills) {
  //     var total = 0;
  //     bills.forEach(element => {
  // total = total + (this.productService.price * this.products.quantity);
  //     });
  //     return total;
  // }


  // add(addproductlistDetails) {
  //   this.value = addproductlistDetails
  //   for (let j = 0; j < addproductlistDetails.length; j++) {
  //     this.sum += this.value[j].amount
  //   }
  // }

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

  // SalesList() {
  //   this.salesService.SalesList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.RegisteredSalesList) {
  //         this.salesDetails = data.RegisteredSalesList;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }


  SalesList() {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.sales.userid = this.user.id;
    // console.log(this.sales.userid);

    this.salesService.RegisteredSalesList(this.sales).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.RegisteredSalesList) {
          this.salesDetails = data.RegisteredSalesList;
          // console.log(this.salesDetails);

        }
      }
    }, (err) => {

    });
  }
  

  addMoreproducts() {
    this.addproductlistDetails.push({
      productId: null,
      productname: null,
      price: null,
      quantity: null,
      amount: null,
      discount_per: null,
      discount_amt: null,
      total_price: null,
    });

  }

  static_price() {
    this.product_priceDetails.push({
      id: null,
      price: '0.00',
    });
  }


  submitForm() {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.activity.createdby = this.user.id;
    this.activity.productList = this.addproductlistDetails;


    this.activityService.addActivity(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
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

  // latest_added_activity() {
  //   this.activityService.latest_added_Activity().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.addActivity) {
  //         this.latestactivityDetails = data.addActivity;
  //         console.log(this.latestactivityDetails);
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

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
    this.activity.clientId = null;
    this.activity.salesId = null;
    this.activity.contact = null;
    this.activity.appointmentDate = null;
  }


  viewActivityForm() {
    this.router.navigate(['/admin/activity/currentactivity']);
  }

}
