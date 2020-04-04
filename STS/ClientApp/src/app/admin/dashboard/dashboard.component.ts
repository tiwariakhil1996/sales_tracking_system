import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { clientModel, clientListModel } from '../../model/client';
import { productModel, productListModel } from '../../model/product';
import { salesregisterModel } from '../../model/sales';
import { activityModel } from '../../model/activity';
import { ProductService } from '../../service/product.service';
import { SalesService } from '../../service/sales.service';
import { ActivityService } from '../../service/activity.service';
import { registerModel } from '../../model/admin';



@Component({
  // styleUrls: ['./dashboard.component.css'],
  templateUrl: 'dashboard.component.html'

})
export class DashboardComponent implements OnInit {

  radioModel: string = 'Month';

  user = new registerModel();

  client = new clientListModel();
  clientDetails: clientListModel[] = [];
  totalClient: any = null;

  product = new productListModel();
  productDetails: productListModel[] = [];
  totalProduct: any;

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];
  totalSales: any;

  activity = new activityModel();
  activityDetails: activityModel[] = [];
  totalActivity: any;

  pageSize: number = 5;

  // RoleJason = {
  //   ROle: [0, 1],
  //   Component: 'DashboardComponent'
  // };


  constructor(private router: Router,
    private clientService: ClientService,
    private productService: ProductService,
    private salesService: SalesService,
    private activityService: ActivityService) {

  }

  ngOnInit() {
    const item = { pageIndex: 0 };
    this.productList(item);
    this.clientList(item);
    this.SalesList(item);
    this.eachactivityList(item);

    // this.checkRole(this.RoleJason);
  }
  // productList() {
  //   this.productService.productList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.ProductList) {
  //         this.productDetails = data.ProductList;
  //         this.totalProduct = this.productDetails.length;
  //         console.log( this.totalProduct );
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

  // checkRole(RoleJason) {

  //   const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
  //   if (this.RoleJason.Component === RoleJason.Component) {
  //     // console.log(result);
  //     if (!this.RoleJason.ROle.includes(result.userType)) {
  //       this.router.navigate(['admin/login']);
  //     }
  //   }
  // }

  // productList() {
  //   this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
  //   this.product.userid = this.user.id;
  //   // console.log(this.product.userid);

  //   this.productService.each_admin_ProductList(this.product).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.each_admin_ProductList) {
  //         this.productDetails = data.each_admin_ProductList;
  //         this.totalProduct = this.productDetails.length;
  //         // console.log(this.totalProduct);

  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

  productList(item) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.product.userid = this.user.id;

    this.product.pageIndex = item.pageIndex;
    this.product.pageSize = this.pageSize;

    this.productService.each_admin_ProductList(this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_admin_ProductList) {
          this.productDetails = data.each_admin_ProductList;
          this.totalProduct = this.productDetails.length;
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
  //         // console.log( this.clientDetails.length);
  //          this.totalClient = this.clientDetails.length;
  //          console.log( this.totalClient );
  //       }
  //     }
  //   }, (err) => {
  //   });
  // }

  clientList(item) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.client.userid = this.user.id;
    // console.log(this.client.userid);

    this.client.pageIndex = item.pageIndex;
    this.client.pageSize = this.pageSize;

    this.clientService.each_admin_ClientList(this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_admin_ClientList) {
          this.clientDetails = data.each_admin_ClientList;
          this.totalClient = this.clientDetails.length;
          // console.log(this.clientDetails);

        }
      }
    }, (err) => {

    });
  }

  // SalesList() {
  //   this.salesService.SalesList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.RegisteredSalesList) {
  //         this.salesDetails = data.RegisteredSalesList;
  //         this.totalSales = this.salesDetails.length;
  //         console.log(this.totalSales);
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

  SalesList(item) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.sales.userid = this.user.id;
    // console.log(this.sales.userid);

    this.sales.pageIndex = item.pageIndex;
    this.sales.pageSize = this.pageSize;

    this.salesService.RegisteredSalesList(this.sales).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.RegisteredSalesList) {
          this.salesDetails = data.RegisteredSalesList;
          this.totalSales = this.salesDetails.length;
          // console.log(this.salesDetails);

        }
      }
    }, (err) => {

    });
  }

  eachactivityList(item) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.activity.userid = this.user.id;

    this.activity.pageIndex = item.pageIndex;
    this.activity.pageSize = this.pageSize;

    this.activityService.each_admin_activityList(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_admin_activityList) {
          this.activityDetails = data.each_admin_activityList;
          this.totalActivity = this.activityDetails.length;
          // console.log(this.totalActivity);

        }
      }
    }, (err) => {

    });
  }

  // ngOnInit(): void {
  //   // generate random values for mainChart
  //   // for (let i = 0; i <= this.mainChartElements; i++) {
  //   //   this.mainChartData1.push(this.random(50, 200));
  //   //   this.mainChartData2.push(this.random(80, 100));
  //   //   this.mainChartData3.push(65);
  //   // }
  //  this.checkRole(RoleJason);

  // }


  // this.totalProduct = this.productDetails.length;
  // this.totalActivity = this.activityDetails.length;
  // this.totalSales = this.salesDetails.length;

}
