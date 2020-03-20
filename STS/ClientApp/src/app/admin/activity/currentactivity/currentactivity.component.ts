import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesService } from '../../../service/sales.service';
import { ProductService } from '../../../service/product.service';
import { ActivityService } from '../../../service/activity.service';
import { ClientService } from '../../../service/client.service';
import { activityModel, addproductListingModel, updateactivityModel, addactivityModel, searchModel, LocationModel, paginationModel, activityDetailsModel, updateproductListingModel } from '../../../model/activity';
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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-currentactivity',
  templateUrl: './currentactivity.component.html',
  styleUrls: ['./currentactivity.component.css']
})
export class CurrentactivityComponent implements OnInit {


  user = new registerModel();

  activity = new activityModel();
  activityDetails: activityModel[] = [];

  productInvoice = new activityDetailsModel();

  activityInvoice = new activityDetailsModel();
  activityInvoiceDetails: activityDetailsModel[] = [];

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

  updateproductlist = new updateproductListingModel;
  updateproductlistDetails: updateproductListingModel[] = [];



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

  currentDate = new Date();
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
  pending_amount: number;

  ind = 0;

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
  lat: number;
  lng: number;

  // Link to get lots of icon form agm marker
  // http://kml4earth.appspot.com/icons.html

  iconAdmin = 'http://maps.google.com/mapfiles/kml/paddle/A.png';
  iconSales = 'http://maps.google.com/mapfiles/kml/paddle/S.png';
  iconClient = 'http://maps.google.com/mapfiles/kml/paddle/C.png';

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


  public origin: any;
  public destination: any;

  // Authentication

  RoleJason = {
    ROle: [0, 1],
    Component: 'CurrentactivityComponent'
  };

  constructor(private activityService: ActivityService,
    private router: Router,
    // private datePipe: DatePipe,
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


    // this.mydate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    // this.eachactivityList();
    // this.activity_productList();
  }


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};

    const item = { pageIndex: 0 };
    this.eachactivityList(item);

    this.addMoreproducts();
    this.static_price();

    // setTimeout(() => {
    navigator.geolocation.getCurrentPosition(position => {
      // console.log(position);

      this.location = position.coords;

      this.centerlat = this.location.latitude;
      this.centerlng = this.location.longitude;

      this.lat = this.location.latitude;
      this.lng = this.location.longitude;

      // console.log(this.lat);
      // console.log(this.lng);


      this.geocoder = new google.maps.Geocoder();
    });
    // }, 2000);

    // this. getDirection();
  }

  // getDirection() {
  //   this.origin = { lat: 21.217319099999997, lng: 72.8664716 };
  //   this.destination = { lat: 21.096879, lng: 72.872747 };
  // }

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

  Total_pending_amt(adv_payment: number) {
    this.pending_amount = 0;
    this.pending_amount = this.final_total - adv_payment;
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
          // console.log( this.activity_productDetails);
          this.activityInvoice.activityproduct = this.activity_productDetails;

          this.subtotal();
          this.dis_amt();
          this.dis_per();
          this.grandtotal();
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
          // console.log(this.activityDetails);

        }
        if (data.RowCount) {
          this.RowCount = data.RowCount;
        }
        this.totalPageSize = Math.ceil(this.RowCount / this.pageSize);
        // console.log(totalPageSize);

        this.totalPageList = [];
        for (let i = 0; i < this.totalPageSize; i++) {
          this.totalPageList.push({ pageSize: i + 1, pageIndex: i });

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
          // this.Activity_Location.salesname=this.activity.salesName;
          // this.Activity_Location.clientname=this.activity.clientName;
        }
      }
    }, (err) => {

    });
  }



  // Edit
  openupdatemodal(content, item, i) {
    this.ind = i;
    this.update_activity = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { size: 'xl', backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];
    sessionStorage.removeItem('ActivityInvoice');
    sessionStorage.removeItem('ActivityProductInvoice');

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
    let strError = '';


    if (!this.update_activity.title) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter title';
    } else
      if (!this.validateTitle(this.activity.title)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '-  Title should only contain alphabets, numbers and space';
      }

    // if (!this.update_activity.clientId) {
    //   strError += strError = '' ? '' : '<br/>';
    //   strError += '- Please select client';
    // }

    // if (!this.update_activity.salesId) {
    //   strError += strError = '' ? '' : '<br/>';
    //   strError += '- Please select sales';
    // }


    if (!this.update_activity.appointmentDate) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter appointment date';
    }

    if (!this.update_activity.description) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter description';
    } else
      if (!this.validateDescription(this.activity.description)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '-  Description should only contain alphabets, numbers space and some special characters $ % & , . " : ';
      }


    if (this.update_activity.advance_payment > this.final_total) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Advance payment should be less then or equal to total amount';
    }

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
    // sending user id  as modified by

    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.update_activity.modifiedby = this.user.id;
    this.update_activity.pending_amount = this.pending_amount;
    this.update_activity.grand_total = this.final_total;
    // Sending product details in array
    // this.update_activity.productList = this.addproductlistDetails;

    this.activityService.updateActivity(aid, this.update_activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        this.toastr.success('Activity is updated sucesfully', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
        this.modalService.dismissAll();
      }
      // this.activity = new activityModel();
      // this.eachactivityList();
      const item = { pageIndex: 0 };
      this.eachactivityList(item);

      this.activity_productList(aid);
      // this.reset_newaddproducts();
      // this.addMoreproducts();
    }, (err) => {
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

    if (isValid) {
      this.toastr.warning('Please enter valid mobile number', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }
  }

  validateMobile(mobileField) {
    const reg = /^\d{10}$/;
    return reg.test(mobileField) === false ? false : true;
  }


  Update_n_addproducts(aid: number) {
    // sending user id  as modified by
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.updateproductlist.modifiedby = this.user.id;

    // Sending product details in array
    this.updateproductlist.productList = this.addproductlistDetails;

    this.activityService.update_n_addProducts(aid, this.updateproductlist).subscribe((data: any) => {
      if (data.Status.code === 0) {
        this.toastr.success('Products is updated sucesfully', 'Successful', {
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
      // this.addMoreproducts();
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
        this.modalService.dismissAll();
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

  // reset_newaddproducts() {
  //   this.addproductlist.price = null;
  //   this.addproductlist.quantity = null;
  //   this.addproductlist.amount = null;
  //   this.addproductlist.discount_per = null;
  //   this.addproductlist.discount_amt = null;
  //   this.addproductlist.total_price = null;
  // }












  GeneratePdf(action = 'open') {
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

    // Set & get Activity Details
    sessionStorage.setItem('ActivityInvoice', JSON.stringify(this.activityInvoiceDetails[0] || {}));
    this.productInvoice = JSON.parse(sessionStorage.getItem('ActivityInvoice')) || [0];

    // Set & get Product Details
    sessionStorage.setItem('ProductInvoice', JSON.stringify(this.activityInvoice));
    this.activityInvoice = JSON.parse(sessionStorage.getItem('ProductInvoice')) || new activityDetailsModel();

    return {
     
        
      // Heading
      content: [
        {
          text: '' + this.currentDate ,
          // bold: true,
          fontSize: 7,
          alignment: 'right',
          // margin: [0, 0, 0, 20]
        },
        {
          text: 'INVOICE',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },

        // Company Info
        {
          columns: [
            [
              {
                text: 'Company Name:' + this.user.companyname,
                style: 'name',
                alignment: 'right'
              },
              {
                text: 'Address:' + this.user.address,
                style: 'name',
                alignment: 'right'
              },
              {
                text: 'Help Desk:' + this.user.email,
                style: 'name',
                alignment: 'right'
              },
              {
                text: 'Contact:' + this.user.mobile,
                style: 'name',
                alignment: 'right'
              },
            ],
          ]
        },

        // Bill Info
        {
          columns: [
            [
              {
                text: 'Bill No                  : ' + this.productInvoice.aid,
                style: 'name'
              },
              {
                text: 'Title                 : ' +  this.productInvoice.title
              },
              {
                text: 'Client Name   : '  +  this.productInvoice.clientName
              },
              {
                text: 'Address          : ' +  this.productInvoice.address
              },
              {
                text: 'Email               : '  + this.productInvoice.email,
              },
              {
                text: 'Date                 : '  +  this.productInvoice.createdon,
              },
              {
                text: 'Delivery Date  : ' +  this.productInvoice.appointmentDate,
              },
            ],

          ]

        },

        // Product Details
        {
          text: 'Product Details',
          style: 'header'
        },

        this.getProductsObject(this.activityInvoice.activityproduct),

        {
          text: 'Advance Paid : ' + this.productInvoice.advancepay,
          // style: 'header'
          // alignment: 'right',
        },
        {
          text: 'Pay Due           : ' + this.productInvoice.pending_amount,
          // style: 'header'
          // alignment: 'right',
        },
        {
          text: 'Grand Total     : ' + this.final_total,
          // style: 'header'
          // alignment: 'right',
        },

        {
          text: 'Signature',
          style: 'sign'
        },

        {
          columns: [
            // Details to show in QR Code
            { qr: 'Company Name :' + this.user.companyname + ', Address :' + this.user.address + ',Contact :' + this.user.mobile + ',Bill No. :' + this.productInvoice.aid + ',Client Name :' + this.productInvoice.clientName + ',Clients Contact No : ' + this.productInvoice.contact, fit: 100 },
         
            // Signature / Name of a person
            {
              // text: `(${this.productInvoice.clientName})`,
              text: `(${this.user.username})`,
              alignment: 'right',
            }
          ]
        },

        {
          text: 'Notice:',
          style: 'header'
        },
        {
          text: 'Invoice was created on a computer and is valid without the signature and seal.'
        },

      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 10,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        }
      }

    };
  }


  getProductsObject(productDetails: updateactivityModel[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*', '*', '*', '*'],
        body: [
          [
            {
              text: 'Product',
              style: 'tableHeader'
            },
            {
              text: 'Price',
              style: 'tableHeader'
            },
            {
              text: 'Qty',
              style: 'tableHeader'
            },
            {
              text: 'Amount',
              style: 'tableHeader'
            },
            {
              text: 'Dis.%',
              style: 'tableHeader'
            },
            {
              text: 'Total',
              style: 'tableHeader'
            },
          ],
          ...productDetails.map(p => {
            return [p.productname, p.price, p.quantity, p.amount, p.discount_per, p.total_price];
          })
        ]
      },



    };
  }

}
