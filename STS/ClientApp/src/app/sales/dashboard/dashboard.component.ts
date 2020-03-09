import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { clientModel, clientListModel } from '../../model/client';
import { productModel, productListModel } from '../../model/product';
import { salesregisterModel } from '../../model/sales';
import { activityModel } from '../../model/activity';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { ProductService } from '../../service/product.service';
import { SalesService } from '../../service/sales.service';
import { ActivityService } from '../../service/activity.service';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  radioModel: string = 'Month';

  user = new salesregisterModel();

  client = new clientListModel();
  clientDetails: clientListModel[] = [];
  totalClient: any = null;

  product = new productListModel();
  productDetails: productListModel[] = [];
  totalProduct: any ;

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];
  totalSales: any;

  activity = new activityModel();
  activityDetails: activityModel[] = [];
  totalActivity: any;

  pageSize: number = 5;

  RoleJason = {
    ROle: [0, 1],
    Component: 'DashboardComponent'
  };

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
    // this.SalesList(item);
    this.activityList(item);

    this.checkRole(this.RoleJason);

  }



  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('salesLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      // console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['sales/login']);
      }
    }
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

  productList(item) {
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.product.userid = this.user.id;
    // console.log(this.product.userid);

    this.product.pageIndex = item.pageIndex;
    this.product.pageSize = this.pageSize;

    this.productService.each_sales_ProductList(this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_sales_ProductList) {
          this.productDetails = data.each_sales_ProductList;
          this.totalProduct = this.productDetails.length;
          // console.log(this.productDetails);

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
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.client.userid = this.user.id;
    // console.log(this.client.userid);

    this.client.pageIndex = item.pageIndex;
    this.client.pageSize = this.pageSize;

    this.clientService.each_sales_ClientList(this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_sales_ClientList) {
          this.clientDetails = data.each_sales_ClientList;
          this.totalClient = this.clientDetails.length;
          // console.log(this.clientDetails);

        }
      }
    }, (err) => {

    });
  }

  activityList(item) {
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.activity.userid = this.user.id;
    // console.log(this.activity.userid);

    this.activity.pageIndex = item.pageIndex;
    this.activity.pageSize = this.pageSize;

    this.activityService.each_sales_activityList(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_sales_activityList) {
          this.activityDetails = data.each_sales_activityList;
          // console.log(this.activityDetails);
          this.totalActivity = this.activityDetails.length;
          // console.log( this.totalActivity );

        }
      }
    }, (err) => {

    });
  }

  // ngOnInit(): void {
  //   // generate random values for mainChart
  //   for (let i = 0; i <= this.mainChartElements; i++) {
  //     this.mainChartData1.push(this.random(50, 200));
  //     this.mainChartData2.push(this.random(80, 100));
  //     this.mainChartData3.push(65);
  //   }
  // }
}
