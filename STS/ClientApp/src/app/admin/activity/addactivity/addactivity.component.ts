import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../../../service/sales.service';
import { ProductService } from '../../../service/product.service';
import { ActivityService } from '../../../service/activity.service';
import { ClientService } from '../../../service/client.service';
import { salesregisterModel } from '../../../model/sales';
import { activityModel, addactivityModel, latestactivityModel, addproductListingModel } from '../../../model/activity';
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

  // activityList_adding: activityList_while_addingModel[] = [];

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];

  product = new productModel();
  productDetails: productModel[] = [];

  product_price = new productpriceModel();
  product_priceDetails: productpriceModel[] = [];

  client = new clientModel();
  clientDetails: clientModel[] = [];

  // _price: string;
  // quantity: number;
  amount: number;
  grand_total: number;
  dis_amount: number;


  total: any = 0;
  final_total: any = 0;
  total_dis_amount: any = 0;
  total_dis_per: any;
  pending_amount: number = 0;

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
    // this.grandtotal();
  }



  TotalAmount(price: number, quantity: number,dis_per: number, i) {
    // Amount
    this.amount = price * quantity;
    this.addproductlistDetails[i].amount = price * quantity;
    // console.log(this.amount);

    // Dis amt
    this.dis_amount = this.amount * dis_per / 100;
    this.addproductlistDetails[i].discount_amt = Math.round(this.amount * dis_per / 100);

    // Total
    this.grand_total = this.amount - this.dis_amount;
    this.addproductlistDetails[i].total_price =  Math.round(this.amount - this.dis_amount);
    // console.log(this.grand_total);

    this.subtotal();
    this.dis_amt();
    this.grandtotal();
  }

  subtotal() {
    this.total = 0;
    for (let i = 0; i < this.addproductlistDetails.length; i++) {
      this.total += this.addproductlistDetails[i].amount;
    }
  }

  dis_amt() {
    this.total_dis_amount = 0;
    for (let i = 0; i < this.addproductlistDetails.length; i++) {
      this.total_dis_amount += this.addproductlistDetails[i].discount_amt;
    }
  }

  grandtotal() {
    this.final_total = 0;
    for (let i = 0; i < this.addproductlistDetails.length; i++) {
      this.final_total += this.addproductlistDetails[i].total_price;

    }
  }

  Total_pending_amt(adv_payment: number) {
    if (adv_payment > 0) {
      this.pending_amount = this.final_total - adv_payment;
    } else {
      this.pending_amount = 0;
    }
  }

  // TotalAmount(price: number, quantity: number, i) {
  //   // Amount
  //   this.amount = price * quantity;
  //   this.addproductlistDetails[i].amount = price * quantity;
  //   console.log(this.amount);

  // }


  // Dis_amt(dis_per: number, i) {
  //   // Discounted amount
  //   this.dis_amount = this.amount * dis_per / 100;
  //   this.addproductlistDetails[i].discount_amt = this.amount * dis_per / 100;

  //   // Total
  //   this.grand_total = this.amount - this.dis_amount;
  //   this.addproductlistDetails[i].total_price = this.amount - this.dis_amount;
  //   console.log(this.grand_total);
  // }

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



  //   total(bills) {
  //     var total = 0;
  //     bills.forEach(element => {
  // total = total + (this.productService.price * this.products.quantity);
  //     });
  //     return total;
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

  onProductChange(id, i) {
    this.price(id, i);
  }
  price(id, i) {
    this.productService.price(id).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ProductPrice) {
          this.product_priceDetails = data.ProductPrice;
          //  console.log(this.product_priceDetails);
          this.addproductlistDetails[i].price = parseInt(this.product_priceDetails[0].price);
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

    this.salesService.SalesList_dropdown(this.sales).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.SalesList_dropdown) {
          this.salesDetails = data.SalesList_dropdown;
          // console.log(this.salesDetails);

        }
      }
    }, (err) => {

    });
  }


  addMoreproducts() {
    this.addproductlistDetails.push({
      productId: null,
      // productname: null,
      // price: null,
      price: 0,
      quantity: null,
      // amount: null,
      amount: 0,
      discount_per: null,
      // discount_amt: null,
      // total_price: null,
      discount_amt: 0,
      total_price: 0,
    });

  }

  static_price() {
    this.product_priceDetails.push({
      id: null,
      price: '0.00',
    });
  }


  submitForm() {
    let strError = '';

    
    if (!this.activity.title) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter title';
    }else
    if (!this.validateTitle(this.activity.title)) {
      strError += strError = '' ? '' : '<br/>';
      strError += strError = '-  Title should only contain alphabets, numbers and space';
    }

    if (!this.activity.clientId) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select client';
    }

    if (!this.activity.salesId) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select sales';
    }

    if (!this.activity.description) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter description';
    }else
    if (!this.validateDescription(this.activity.description)) {
      strError += strError = '' ? '' : '<br/>';
      strError += strError = '-  Description should only contain alphabets, numbers space and some special characters $ % & , . " : ';
    }

    if (!this.activity.appointmentDate) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter appointment date';
    }

    if (!this.activity.payment_mode) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select payment mode';
    }

    // if (!this.activity.productList) {
    //   strError += strError = '' ? '' : '<br/>';
    //   strError += '- Please enter product details';
    // }

    if (strError !== '') {
      this.toastr.warning(strError, 'Warning', {
        disableTimeOut: false,
        timeOut: 2000,
        enableHtml: true,
        progressBar: true,
        closeButton: true,
      });
      return false;
    }

    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.activity.createdby = this.user.id;
    this.activity.productList = this.addproductlistDetails;
    this.activity.subtotal = this.total;
    this.activity.discount_amt = this.total_dis_amount;
    
    this.activity.pending_amount = this.pending_amount;
    this.activity.grand_total = this.final_total;

    this.activityService.addActivity(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        this.toastr.success('Activity is added Successfully', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
      // this.activity = new addactivityModel();
      // else if (data.Status.code === 2) {
      //   this.toastr.warning('Please add atleast one product', 'Warning', {
      //     disableTimeOut: false,
      //     timeOut: 2000
      //   });
      // } 
    }, (err) => {

      console.log(err);

    });
  }

  TitleValidation() {
    let isValid = false;
    if (!this.validateTitle(this.activity.title)) {
      isValid = true;
    }

    if (isValid) {
      this.toastr.warning('Please enter title correctly', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }

  validateTitle(titleField) {
    const reg = /^[A-Za-z0-9\s]+$/;
    return reg.test(titleField) === false ? false : true;
  }


  activityDescription() {
    let isValid = false;
    if (!this.validateDescription(this.activity.description)) {
      isValid = true;
    }

    if (isValid) {
      this.toastr.warning('Please enter productname correctly', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }

  validateDescription(productdescription) {
    // const reg = /^[A-Za-z0-9\s]+$/;
    const reg = /^[A-Za-z0-9\s$%&,.":]+$/;
    return reg.test(productdescription) === false ? false : true;
  }

  mobValidation() {
    let isValid = false;
    if (!this.validateMobile(this.activity.contact)) {
      isValid = true;
    }
    ;
    if (isValid) {
      this.toastr.warning('Please enter valid mobile number', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }
  }

  validateMobile(mobileField) {
    var reg = /^\d{10}$/;
    return reg.test(mobileField) == false ? false : true;
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

  // activityList_while_adding() {
  //   this.activityService.activityList_while_adding().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.ActivityList_while_adding) {
  //         this.activityList_adding = data.ActivityList_while_adding;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

  resetForm() {
    // this.activity.clientId = null;
    // this.activity.salesId = null;
    // this.activity.contact = null;
    // this.activity.appointmentDate = null;
    this.activity = new addactivityModel();
  }


  viewActivityForm() {
    this.router.navigate(['/admin/activity/currentactivity']);
  }

}
