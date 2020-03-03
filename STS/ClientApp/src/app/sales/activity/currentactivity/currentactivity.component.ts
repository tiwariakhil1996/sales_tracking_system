import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesService } from '../../../service/sales.service';
import { ProductService } from '../../../service/product.service';
import { ClientService } from '../../../service/client.service';
import { ActivityService } from '../../../service/activity.service';
import { activityModel, updateactivityModel } from '../../../model/activity';
import { salesregisterModel } from '../../../model/sales';
import { productModel } from '../../../model/product';
import { clientModel } from '../../../model/client';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';

@Component({
  selector: 'app-currentactivity',
  templateUrl: './currentactivity.component.html',
  styleUrls: ['./currentactivity.component.css']
})
export class CurrentactivityComponent implements OnInit {

  user = new salesregisterModel();

  activity = new activityModel();
  activityDetails: activityModel[] = [];

  activity_product = new updateactivityModel();
  activity_productDetails: updateactivityModel[] = [];

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
  @ViewChild(AgmMap) map: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  RoleJason = {
    ROle: [0, 1],
    Component: 'CurrentactivityComponent'
  };

  constructor(private clienService: ClientService,
    private activityService: ActivityService,
    private modalService: NgbModal,
    private salesService: SalesService,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService) {

    this.geocoder = new google.maps.Geocoder;
    // this.activityList();
    // this.productList();
    // this.clientList();
    // this.SalesList();
    this.activityList();
  }


  ngOnInit() {
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);

        this.location = position.coords;
        this.centerlat = this.location.latitude;
        this.centerlng = this.location.longitude;
        this.lat = this.location.latitude;
        this.lng = this.location.longitude;
        this.geocoder = new google.maps.Geocoder();
      });
    }, 2000);


    this.checkRole(this.RoleJason);
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
  // Delete

  onDelete(aid: number) {
    // if (confirm('Are you sure to delete this record ?') === true) {
    this.activityService.deleteActivity(aid).subscribe(data => {
      // this.activityService.activityList();
      // this.activityList();
    });
    // }
    this.toastr.success('Activity is deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
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

  // subcategoryList(catid) {
  //   this.categoryService.subcategoryList(catid).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.SubcategoryList) {
  //         this.subcategoryDetails = data.SubcategoryList;
  //       }
  //     }
  //   }, (err) => {

  //     console.log(this.subcategoryDetails);
  //   });
  // }


  activityList() {
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.activity.userid = this.user.id;
    console.log(this.activity.userid);

    this.activityService.each_sales_activityList(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_sales_activityList) {
          this.activityDetails = data.each_sales_activityList;
          console.log(this.activityDetails);

        }
      }
    }, (err) => {

    });
  }

  // Edit
  openupdatemodal(content, item) {
    this.activity = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { size: 'xl', backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

  }

  open(content1) {
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' });
  }

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

  // onEdit(aid: number) {
  //   this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
  //   this.activity.modifiedby = this.user.id;
  //   console.log(this.activity.modifiedby);

  //   this.activityService.updateActivity(aid, this.activity).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       // alert('Activity updated sucesfully');
  //       this.toastr.success('Activity is updated sucesfully', 'Successful', {
  //         disableTimeOut: false,
  //         timeOut: 2000
  //       });
  //     }
  //     this.activity = new activityModel();
  //     // this.activityList();
  //   }, (err) => {
  //   });
  // }

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
    this.clienService.clientList().subscribe((data: any) => {
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
    this.router.navigate(['/sales/activity/addactivity']);

  }



  update_Inprogress(aid: number) {
    // this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    // this.activity.modifiedby = this.user.id;
    // console.log(this.activity.modifiedby);

    this.activity.latitude = this.lat;
    this.activity.longitude = this.lng;

    this.activityService.updateInprogress(aid, this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Activity updated sucesfully');
        this.toastr.success('Activity is in Progress', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });

      }

      this.activityList();
    }, (err) => {
    });


    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.activity.user_id = this.user.id;
    console.log(this.activity.user_id);

    this.activityService.activity_history(aid, this.activity).subscribe((data: any) => {

    }, (err) => {
    });
  }


  update_ToFollowup(aid: number) {

    // this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    // this.activity.modifiedby = this.user.id;
    // console.log(this.activity.modifiedby);


    this.activity.latitude = this.lat;
    this.activity.longitude = this.lng;

    this.activityService.updateToFollowup(aid, this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        this.toastr.success('Activity is in Followup', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }

      this.activityList();
    }, (err) => {
    });
  }

  update_ToClose(aid: number) {
    // this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    // this.activity.modifiedby = this.user.id;
    // console.log(this.activity.modifiedby);

    this.activity.latitude = this.lat;
    this.activity.longitude = this.lng;

    this.activityService.updateToClose(aid, this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Activity updated sucesfully');
        this.toastr.success('Activity is Closed', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
      // this.activity = new activityModel();
      this.activityList();
    }, (err) => {
    });
  }

  update_ToCancel(aid: number) {
    // this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    // this.activity.modifiedby = this.user.id;
    // console.log(this.activity.modifiedby);

    this.activity.latitude = this.lat;
    this.activity.longitude = this.lng;

    this.activityService.updateToCancel(aid, this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Activity updated sucesfully');
        this.toastr.success('Activity is Canceled', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
      // this.activity = new activityModel();
      this.activityList();
    }, (err) => {
    });
  }

}
