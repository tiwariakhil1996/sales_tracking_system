import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesService } from '../../../service/sales.service';
import { ProductService } from '../../../service/product.service';
import { ActivityService } from '../../../service/activity.service';
import { ClientService } from '../../../service/client.service';
import { activityModel, addproductListingModel, updateactivityModel, addactivityModel, searchModel } from '../../../model/activity';
import { salesregisterModel } from '../../../model/sales';
import { productModel, productpriceModel } from '../../../model/product';
import { clientModel } from '../../../model/client';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { registerModel } from '../../../model/admin';

@Component({
  selector: 'app-currentactivity',
  templateUrl: './currentactivity.component.html',
  styleUrls: ['./currentactivity.component.css']
})
export class CurrentactivityComponent implements OnInit {
  // items = [];
  // pageOfItems: Array<any>;

  user = new registerModel();

  activity = new activityModel();
  activityDetails: activityModel[] = [];

  search =new searchModel();
  searchDetails: searchModel[] = [];
  // update_activityproduct = new editactivityModel();
  // update_activityproductDetails: editactivityModel[] = [];

  update_activity = new addactivityModel();
  update_activityDetails: addactivityModel[] = [];

  addproductlist = new addproductListingModel;
  addproductlistDetails: addproductListingModel[] = [];

  product_price = new productpriceModel();
  product_priceDetails: productpriceModel[] = [];

  activity_product = new updateactivityModel();
  activity_productDetails: updateactivityModel[] = [];

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];

  product = new productModel();
  productDetails: productModel[] = [];

  client = new clientModel();
  clientDetails: clientModel[] = [];

  constructor(private activityService: ActivityService,
    private router: Router,
    private clientService: ClientService,
    private modalService: NgbModal,
    private salesService: SalesService,
    private productService: ProductService,
    private toastr: ToastrService) {
    // this.activityList();
    this.productList();
    this.clientList();
    this.SalesList();

   
    this.eachactivityList();
    // this.activity_productList();
  }


  ngOnInit() {
    this.addMoreproducts();
    this.static_price();
  }

  onSearch(aid: any) {
      this.activityService.searchTitle(aid).subscribe(data => {
        // this.activityList();
     
      });
  }

  // Search() {
  //   this.activityService.searchActivity(this.search).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.searchTitle) {
  //         this.searchDetails = data.searchTitle;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

  // Delete

  onDelete(aid: number) {
    // if (confirm('Are you sure to delete this record ?') === true) {
    this.activityService.deleteActivity(aid).subscribe(data => {
      // this.activityService.activityList();
      this.eachactivityList();
    });
    this.toastr.success('Activity is deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
    });
    // }
  }

  onProductDelete(productId: number, aid) {
    this.activityService.deleteProduct(productId).subscribe(data => {
      this.eachactivityList();
      this.activity_productList(aid);
    });
    this.toastr.success('Product is deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
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
      price: "0.00",
    });
  }

  // activityList() {
  //   this.activityService.activityList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.ActivityList) {
  //         this.activityDetails = data.ActivityList;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

  GetProduct_Activity(aid) {
    this.activity_productList(aid);

  }


  activity_productList(aid) {
    this.activityService.activity_productList(aid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.Activity_ProductList) {
          this.activity_productDetails = data.Activity_ProductList;
        }
      }
    }, (err) => {

    });
  }
  eachactivityList() {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.activity.userid = this.user.id;
    console.log(this.activity.userid);

    this.activityService.each_admin_activityList(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_admin_activityList) {
          this.activityDetails = data.each_admin_activityList;
          console.log(this.activityDetails);

        }
      }
    }, (err) => {

    });
  }

  // Edit
  openupdatemodal(content, item) {
    this.update_activity = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { size: 'xl', backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

  }

  open_productupdatemodal(content1, products) {
    this.activity_product = JSON.parse(JSON.stringify(products));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content1, { size: 'xl', backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

  }


  onEdit(aid: number) {
    // sending user id  as modified by
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.update_activity.modifiedby = this.user.id;

    // Sending product details in array
    this.update_activity.productList = this.addproductlistDetails;

    this.activityService.updateActivity(aid, this.update_activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        this.toastr.success('Activity is updated sucesfully', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
      // this.activity = new activityModel();
      this.eachactivityList();
      this.activity_productList(aid);
    }, (err) => {
    });
  }



  Update_old_Products(aid: number) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.activity_product.modifiedby = this.user.id;
    console.log(this.activity_product.modifiedby);

    this.activityService.update_old_Products(aid, this.activity_product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Activity updated sucesfully');
        this.toastr.success('Product is updated successfully', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
      // this.activity_product = new activityModel();
      this.activity_productList(aid);
    }, (err) => {
    });
  }





  // Display

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
    this.clientService.clientList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ClientList) {
          this.clientDetails = data.ClientList;
        }
      }
    }, (err) => {

    });
  }

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


  addnewActivity() {
    this.router.navigate(['/admin/activity/addactivity']);

  }
}
