import { Downloadpdf } from './../../../model/activity';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesService } from '../../../service/sales.service';
import { ProductService } from '../../../service/product.service';
import { ActivityService } from '../../../service/activity.service';
import { ClientService } from '../../../service/client.service';
import { activityModel, addproductListingModel, updateactivityModel, addactivityModel, searchModel, LocationModel, paginationModel, activityDetailsModel } from '../../../model/activity';
import { salesregisterModel } from '../../../model/sales';
import { productModel, productpriceModel, updateproductModel } from '../../../model/product';
import { clientModel } from '../../../model/client';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { registerModel } from '../../../model/admin';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;




// For Map

import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { MouseEvent } from '@agm/core';
import { google } from 'google-maps';
import { from } from 'rxjs';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-currentactivity',
  templateUrl: './currentactivity.component.html',
  styleUrls: ['./currentactivity.component.css']
})
export class CurrentactivityComponent implements OnInit {


  user = new registerModel();

  activity = new activityModel();
  activityDetails: activityModel[] = [];

  activityInvoice = new activityDetailsModel();
  activityInvoiceDetails: activityDetailsModel[] = [];

  // invoice=new Downloadpdf();
  // invoices:Downloadpdf[]=[];

  

  // search = new searchModel();
  // searchDetails: searchModel[] = [];
  // update_activityproduct = new editactivityModel();
  // update_activityproductDetails: editactivityModel[] = [];

  Activity_Location = new LocationModel();
  Activity_LocationDetails: LocationModel[] = [];

  update_activity = new addactivityModel();
  update_activityDetails: addactivityModel[] = [];

  addproductlist = new addproductListingModel;
  addproductlistDetails: addproductListingModel[] = [];

  product_price = new productpriceModel();
  product_priceDetails: productpriceModel[] = [];

  activity_product = new updateactivityModel();
  activity_productDetails: updateactivityModel[] = [];

  // updateproduct = new updateproductModel();
  // updateproductDetails: updateproductModel[] = [];

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];

  product = new productModel();
  productDetails: productModel[] = [];

  client = new clientModel();
  clientDetails: clientModel[] = [];

  // For Map

  //  latitude: number;
  //  longitude: number;

  // Searching
  search_: any;
  from_date: string;
  to_date: string;

  amount: number;
  grand_total: number;
  dis_amount: number;

  pay_due: number;


  total: any;
  final_total: any;
  total_dis_amount: any;
  total_dis_per: any;


  zoom: number;
  address: string;

  private geoCoder;

  _admin = 'A';
  _sales = 'S';
  _client = 'C';

  location: Coordinates;
  lat: any;
  lng: any;

  centerlat: any;
  centerlng: any;
  geocoder: any;
  @ViewChild(AgmMap) map: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

  // Pagination
  RowCount: number;
  pageSize: number = 5;
  totalPageList: paginationModel[] = [];
  totalPageSize: number;
  pagesize: any;
  currentPageIndex: number = 0;
  pageOfItems: Array<any>;

  // Authentication

  RoleJason = {
    ROle: [0, 1],
    Component: 'CurrentactivityComponent'
  };

  constructor(private activityService: ActivityService,
    private router: Router,
    private clientService: ClientService,
    private modalService: NgbModal,
    private salesService: SalesService,
    private productService: ProductService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private toastr: ToastrService) {
    this.geocoder = new google.maps.Geocoder;
    // this.activityList();
    this.productList();
    this.clientList();
    this.SalesList();
    this.activityInvoice = JSON.parse(sessionStorage.getItem('invoice'));




    // this.eachactivityList();
    // this.activity_productList();
  }


  ngOnInit() {

    const item = { pageIndex: 0 };
    this.eachactivityList(item);

    this.addMoreproducts();
    this.static_price();

    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);

        this.location = position.coords;

        this.centerlat = this.location.latitude;
        this.centerlng = this.location.longitude;

        this.lat = this.location.latitude;
        this.lng = this.location.longitude;

        this.geocoder = new google.maps.Geocoder();
      });
    }, 2000);
  }

  TotalAmount(price: number, quantity: number, dis_per: number, i) {
    // Amount
    this.amount = price * quantity;
    this.addproductlistDetails[i].amount = price * quantity;
    console.log(this.amount);

    // Dis amt
    this.dis_amount = this.amount * dis_per / 100;
    this.addproductlistDetails[i].discount_amt = Math.round(this.amount * dis_per / 100);

    // Total
    this.grand_total = this.amount - this.dis_amount;
    this.addproductlistDetails[i].total_price = Math.round(this.amount - this.dis_amount);
    console.log(this.grand_total);

  }
  Total_Adv_pay(advance_pay: number) {
    // Payment Due
    this.pay_due=0;
    this.pay_due = this.final_total - advance_pay;
    // console.log(this.pay_due);
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  // // Get Current Location Coordinates
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 8;
  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }


  // markerDragEnd($event: MouseEvent) {
  //   // console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   // this.getAddress(this.latitude, this.longitude);
  // }

  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     // console.log(results);
  //     // console.log(status);
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //       // console.log(this.address);

  //     }
  //   });
  // }

  // onSearch(aid: any) {
  //   this.activityService.searchTitle(aid).subscribe(data => {
  //     // this.activityList();

  //   });
  // }

  // Search() {
  //   this.activityService.searchActivity(this.search).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.searchActivity) {
  //         this.searchDetails = data.searchActivity;
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
      // this.eachactivityList();
      const item = { pageIndex: 0 };
      this.eachactivityList(item);
    });
    this.toastr.success('Activity is deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
    });
    // }
  }

  onProductDelete(productId: number, aid) {
    this.activityService.deleteProduct(productId).subscribe(data => {
      // this.eachactivityList();
      const item = { pageIndex: 0 };
      this.eachactivityList(item);
      this.activity_productList(aid);
    });
    this.toastr.success('Product is deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
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
          this.addproductlistDetails[i].price = parseInt(this.product_priceDetails[0].price);

        }
      }
    }, (err) => {

      console.log(err);
    });
  }

  addMoreproducts() {

    this.addproductlistDetails.push({
      productId: null,
      // productname: null,
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

  activity_Details(aid) {
    this.activityService.activity_Details(aid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.activity_Details) {
          this.activityInvoiceDetails = data.activity_Details;
          console.log(this.activityInvoiceDetails);

        }
      }
    }, (err) => {

    });
  }

  GetProduct_Activity(aid) {
    this.activity_productList(aid);

    this.activity_Details(aid);
  }


  activity_productList(aid) {
    this.activityService.activity_productList(aid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.Activity_ProductList) {
          this.activity_productDetails = data.Activity_ProductList;
          //console.log( this.activity_productDetails);

          this.subtotal();
          this.dis_amt();
          this.dis_per();
          this.grandtotal();
          // this.advance_payment();
        }
      }
    }, (err) => {

    });
  }

  subtotal() {
    this.total = 0;
    for (let i = 0; i < this.activity_productDetails.length; i++) {
      this.total += this.activity_productDetails[i].amount;
    }
  }


  grandtotal() {
    this.final_total = 0;
    for (let i = 0; i < this.activity_productDetails.length; i++) {
      this.final_total += this.activity_productDetails[i].total_price;

    }
  }


  dis_amt() {
    this.total_dis_amount = 0;
    for (let i = 0; i < this.activity_productDetails.length; i++) {
      this.total_dis_amount += this.activity_productDetails[i].discount_amt;
    }
  }



  dis_per() {
    this.total_dis_per = 0;
    for (let i = 0; i < this.activity_productDetails.length; i++) {
      this.total_dis_per += this.activity_productDetails[i].discount_per;
    }
  }

  onsearch() {
    const item = { pageIndex: 0 };
    this.eachactivityList(item);
  }

  eachactivityList(item) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.activity.userid = this.user.id;
    // console.log(this.activity.userid);

    this.activity.pageIndex = item.pageIndex;
    this.activity.pageSize = this.pageSize;
    this.activity.search = this.search_;
    this.activity.from_date = this.from_date;
    this.activity.to_date = this.to_date;

    this.activityService.each_admin_activityList(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_admin_activityList) {
          this.activityDetails = data.each_admin_activityList;
          console.log(this.activityDetails);

        }
        if (data.RowCount) {
          this.RowCount = data.RowCount;
        }
        this.totalPageSize = Math.ceil(this.RowCount / this.pageSize);
        // console.log(totalPageSize);

        this.totalPageList = [];
        for (var i = 0; i < this.totalPageSize; i++) {
          this.totalPageList.push({ pageSize: i + 1, pageIndex: i })

        }
      }
    }, (err) => {

    });
  }

  // Client & Sales Location

  Get_Lat_Long_of_Activity(aid) {
    this.activity_Location(aid);
  }

  activity_Location(aid) {
    this.activityService.activity_Location(aid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.Activity_Location) {
          this.Activity_LocationDetails = data.Activity_Location;
          console.log(this.Activity_LocationDetails);
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

  open_map_modal(map) {
    this.modalService.open(map, { size: 'xl', backdropClass: 'light-blue-backdrop' });
  }



  track_activity() {
    this.router.navigate(['/admin/activity/track-activity']);

  }


  Update(aid: number) {
    // sending user id  as modified by
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.update_activity.modifiedby = this.user.id;
   this.update_activity.paydue=this.pay_due;
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
      // this.eachactivityList();
      const item = { pageIndex: 0 };
      this.eachactivityList(item);

      this.activity_productList(aid);
      // this.reset_newaddproducts();
      this.addMoreproducts();
    }, (err) => {
    });
  }



  Update_old_Products(aid: number) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.activity_product.modifiedby = this.user.id;
    // console.log(this.activity_product.modifiedby);

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
          // this.updateproductDetails = data.ProductList;
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


  addnewActivity() {
    this.router.navigate(['/admin/activity/addactivity']);

  }
  
  
  // generatePdf(){
  //   // const documentDefinition = { content: 'invoice'};
  //   var blob = new Blob([document.getElementById('invoice').innerHTML])
  //   var docDefinition = { content: [blob]
  //   }
  //     pdfMake.createPdf(docDefinition).open();
  //  }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  
   getDocumentDefinition() {
   
    sessionStorage.setItem('invoice', JSON.stringify(this.activityInvoice));

    return {
      content: [
        {
          text: 'INVOICE',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.activityInvoice.aid,
              style: 'Bill No:'
            },
            // 
            //   text: this.resume.address
            // },
            // {
            //   text: 'Email : ' + this.resume.email,
            // },
            // {
            //   text: 'Contant No : ' + this.resume.contactNo,
            // },
            // {
            //   text: 'GitHub: ' + this.resume.socialProfile,
            //   link: this.resume.socialProfile,
            //   color: 'blue',
            // }
            ],
            // [
            //   this.getProfilePicObject()
            // ]
          ]
        },
        // {
        //   text: 'Skills',
        //   style: 'header'
        // },
        // {
        //   columns : [
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
        //       ]
        //     },
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
        //       ]
        //     },
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
        //       ]
        //     }
        //   ]
        // },
        // {
        //   text: 'Experience',
        //   style: 'header'
        // },
        // this.getExperienceObject(this.resume.experiences),

        // {
        //   text: 'Education',
        //   style: 'header'
        // },
        // this.getEducationObject(this.resume.educations),
        // {
        //   text: 'Other Details',
        //   style: 'header'
        // },
        // {
        //   text: this.resume.otherDetails
        // },
        // {
        //   text: 'Signature',
        //   style: 'sign'
        // },
        // {
        //   columns : [
        //       { qr: this.resume.name + ', Contact No : ' + this.resume.contactNo, fit : 100 },
        //       {
        //       text: `(${this.resume.name})`,
        //       alignment: 'right',
        //       }
        //   ]
        // }
      ],
      // info: {
      //   title: this.resume.name + '_RESUME',
      //   author: this.resume.name,
      //   subject: 'RESUME',
      //   keywords: 'RESUME, ONLINE RESUME',
      // },
        // styles: {
        //   header: {
        //     fontSize: 18,
        //     bold: true,
        //     margin: [0, 20, 0, 10],
        //     decoration: 'underline'
        //   },
        //   name: {
        //     fontSize: 16,
        //     bold: true
        //   },
        //   jobTitle: {
        //     fontSize: 14,
        //     bold: true,
        //     italics: true
        //   },
        //   sign: {
        //     margin: [0, 50, 0, 10],
        //     alignment: 'right',
        //     italics: true
        //   },
        //   tableHeader: {
        //     bold: true,
        //   }
        // }
    };
  }



  // reset_newaddproducts() {
  //   this.addproductlist.price = null;
  //   this.addproductlist.quantity = null;
  //   this.addproductlist.amount = null;
  //   this.addproductlist.discount_per = null;
  //   this.addproductlist.discount_amt = null;
  //   this.addproductlist.total_price = null;
  // }
}
