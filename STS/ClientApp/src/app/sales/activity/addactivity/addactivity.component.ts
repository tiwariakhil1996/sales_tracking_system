import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../../../service/sales.service';
import { ProductService } from '../../../service/product.service';
import { ActivityService } from '../../../service/activity.service';
import { ClientService } from '../../../service/client.service';
import { productModel } from '../../../model/product';
import { salesregisterModel, LocationModel } from '../../../model/sales';
import { activityModel } from '../../../model/activity';
import { clientModel } from '../../../model/client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent implements OnInit {

  user = new salesregisterModel();

  saleslocation = new LocationModel();
  saleslocationDetails: LocationModel[] = [];
  
  activity = new activityModel();
  activityDetails: activityModel[] = [];

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];

  product = new productModel();
  productDetails: productModel[] = [];

  client = new clientModel();
  clientDetails: clientModel[] = [];

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

  private geoCoder;


  location: Coordinates;
  lat: any;
  lng: any;

  centerlat: any;
  centerlng: any;
  geocoder: any;

  RoleJason = {
    ROle: [0, 1],
    Component: 'AddactivityComponent'
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
   }

  ngOnInit() {
    this.checkRole(this.RoleJason);

    this. Refresh_Location();
  }


  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('salesLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['sales/login']);
      }
    }
  }

 Refresh_Location() {
     navigator.geolocation.getCurrentPosition(position => {
       this.location = position.coords;
       this.centerlat = this.location.latitude;
       this.centerlng = this.location.longitude;
 
       this.lat = this.location.latitude;
       this.lng = this.location.longitude;
 
       console.log(this.lat);
       console.log(this.lng);
 
       this.geocoder = new google.maps.Geocoder();
       this.Refresh_Sales_Location();
     });

   }

   Refresh_Sales_Location() {
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.saleslocation.userid = this.user.id;
    this.saleslocation.latitude = this.lat;
    this.saleslocation.longitude = this.lng;

    this.salesService.Refresh_Sales_Location(this.saleslocation).subscribe((data: any) => {
    }, (err) => {

    });
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


  submitForm() {
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.activity.createdby = this.user.id;
    console.log(this.activity.createdby);

    this.activityService.addActivity(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Activity added sucesfully');
        this.toastr.success('Activity is added Successfully', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
      this.activity = new activityModel();
    }, (err) => {

       console.log(err);

    });
  }

  resetForm() {
    this.activity.productId = null;
    this.activity.clientId = null;
    this.activity.salesId = null;
    this.activity.contact = null;

    this.activity.appointmentDate = null;
  }



  viewActivityForm() {
    this.router.navigate(['/sales/activity/currentactivity']);
  }

}
