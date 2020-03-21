import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesService } from '../../../service/sales.service';
import { ProductService } from '../../../service/product.service';
import { ClientService } from '../../../service/client.service';
import { ActivityService } from '../../../service/activity.service';
import { activityModel, updateactivityModel, paginationModel, activityDetailsModel } from '../../../model/activity';
import { salesregisterModel, LocationModel } from '../../../model/sales';
import { productModel } from '../../../model/product';
import { clientModel } from '../../../model/client';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// import { ViewChild, ElementRef, NgZone } from '@angular/core';
// import { MapsAPILoader, AgmMap } from '@agm/core';

@Component({
  selector: 'app-currentactivity',
  templateUrl: './currentactivity.component.html',
  styleUrls: ['./currentactivity.component.css']
})
export class CurrentactivityComponent implements OnInit {

  user = new salesregisterModel();

  saleslocation = new LocationModel();
  saleslocationDetails: LocationModel[] = [];

  activity = new activityModel();
  activityDetails: activityModel[] = [];

  activity_product = new updateactivityModel();
  activity_productDetails: updateactivityModel[] = [];

  
  productInvoice = new activityDetailsModel();

  activityInvoice = new activityDetailsModel();
  activityInvoiceDetails: activityDetailsModel[] = [];
  
  sales = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];

  product = new productModel();
  productDetails: productModel[] = [];

  client = new clientModel();
  clientDetails: clientModel[] = [];

  currentDate = new Date();

  due_paid: number;

  ind = 0;
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
  // @ViewChild(AgmMap) map: any;

  // @ViewChild('search')
  // public searchElementRef: ElementRef;

  search_: any;
  from_date: string;
  to_date: string;

  // Pagination
  RowCount: number;
  pageSize: number = 5;
  totalPageList: paginationModel[] = [];
  totalPageSize: number;
  pagesize: any;
  currentPageIndex: number = 0;
  pageOfItems: Array<any>;

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

    // this.geocoder = new google.maps.Geocoder;
    // this.activityList();
    // this.productList();
    // this.clientList();
    // this.SalesList();
    // this.activityList();
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.activity.user_id = this.user.id;
    console.log(this.activity.user_id);
  }


  ngOnInit() {
    // this.activity_productList(aid)
    const item = { pageIndex: 0 };
    this.activityList(item);

    // setTimeout(() => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);

      this.location = position.coords;
      this.centerlat = this.location.latitude;
      this.centerlng = this.location.longitude;
      this.lat = this.location.latitude;
      this.lng = this.location.longitude;
      this.geocoder = new google.maps.Geocoder();
    });
    // }, 2000);

    this.checkRole(this.RoleJason);

    this.Refresh_Location();
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


  // activityList() {
  //   this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
  //   this.activity.userid = this.user.id;
  //   console.log(this.activity.userid);

  //   this.activityService.each_sales_activityList(this.activity).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.each_sales_activityList) {
  //         this.activityDetails = data.each_sales_activityList;
  //         console.log(this.activityDetails);

  //       }
  //     }
  //   }, (err) => {

  //   });
  // }


  onsearch() {
    const item = { pageIndex: 0 };
    this.activityList(item);
  }

  activityList(item) {
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.activity.userid = this.user.id;
    console.log(this.activity.userid);

    this.activity.pageIndex = item.pageIndex;
    this.activity.pageSize = this.pageSize;

    this.activity.search = this.search_;
    this.activity.from_date = this.from_date;
    this.activity.to_date = this.to_date;

    this.activityService.each_sales_activityList(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_sales_activityList) {
          this.activityDetails = data.each_sales_activityList;
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

  // Edit
  openupdatemodal(content, item, i) {
    this.ind = i;
    this.activity = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { size: 'xl', backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

  }

  open(content1) {
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' });
  }

  open_closeactivity(closeactivity) {
    if (this.activity.pendingamount > 0) {
      this.activityDetails[this.ind];
    this.modalService.open(closeactivity, { ariaLabelledBy: 'modal-basic-title' });
    } else {
      this.update_ToClose(this.activity.aid)
    }

  }


  activity_Details(aid) {
    this.activityService.activity_Details(aid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.activity_Details) {
          this.activityInvoiceDetails = data.activity_Details;
          console.log(this.activityInvoiceDetails);

         sessionStorage.setItem('ActivityInvoice', JSON.stringify(this.activityInvoiceDetails[0] || {}));

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
          // console.log(this.activity_productDetails);
          this.activityInvoice.activityproduct = this.activity_productDetails;

          sessionStorage.setItem('ProductInvoice', JSON.stringify(this.activityInvoice));


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
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.activity.user_id = this.user.id;
    console.log(this.activity.user_id);

    this.activity.latitude = this.lat;
    this.activity.longitude = this.lng;

    this.activityService.updateInprogress(aid, this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Activity updated sucesfully');
        this.toastr.success('Activity is in Progress', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
        this.modalService.dismissAll();
      }

      // this.activityList();
      const item = { pageIndex: 0 };
      this.activityList(item);
    }, (err) => {
    });


    // this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    // this.activity.user_id = this.user.id;
    // console.log(this.activity.user_id);

    // this.activityService.activity_history(aid, this.activity).subscribe((data: any) => {

    // }, (err) => {
    // });
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
      this.modalService.dismissAll();
      // this.activityList();
      const item = { pageIndex: 0 };
      this.activityList(item);
    }, (err) => {
    });
  }

  // pay_due(pay_due: number, pendingamount: number) {
  //   this.due_paid = pendingamount - pay_due;
  //   console.log(this.due_paid);
  //   this.update_InPending(this.activity.aid)
  // }

  remain_to_pay(pendingamount: number, amt_paid: number){
    this.due_paid = pendingamount - amt_paid;
  }

  pay_due(pendingamount: number, amt_paid: number, aid: number) {
    this.due_paid = pendingamount - amt_paid;
  
    let strError = '';

     if (!this.activity.paydue) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter due amount';
    }

    if (!this.activity.payment_mode) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select payment mode';
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

    if (this.activity.paydue === this.due_paid) {
      this.activity.pendingId = 4;
    } else{
      this.activity.pendingId = 6;
    }

    this.activity.latitude = this.lat;
    this.activity.longitude = this.lng;
    this.activity.paydue = this.due_paid;
    this.activityService.updateToPending(aid, this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        this.toastr.success('Activity is in Pending', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
      this.modalService.dismissAll();
      // this.activityList();
      const item = { pageIndex: 0 };
      this.activityList(item);
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
      this.modalService.dismissAll();
      // this.activity = new activityModel();
      // this.activityList();
      const item = { pageIndex: 0 };
      this.activityList(item);
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
        this.modalService.dismissAll();
      }
      // this.activity = new activityModel();
      // this.activityList();
      const item = { pageIndex: 0 };
      this.activityList(item);
    }, (err) => {
    });
  }


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

    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    // get Activity Details
    // sessionStorage.setItem('ActivityInvoice', JSON.stringify(this.activityInvoiceDetails[0] || {}));
    this.productInvoice = JSON.parse(sessionStorage.getItem('ActivityInvoice')) || [0];

    // get Product Details
    // sessionStorage.setItem('ProductInvoice', JSON.stringify(this.activityInvoice));
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
                text: 'Address:' + this.user.companyaddress,
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
          text: 'Grand Total     : ' + this.productInvoice.grandtotal,
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
            { qr: 'Company Name :' + this.user.companyname + ', Address :' + this.user.companyaddress + ',Contact :' + this.user.mobile + ',Bill No. :' + this.productInvoice.aid + ',Client Name :' + this.productInvoice.clientName + ',Clients Contact No : ' + this.productInvoice.contact, fit: 100 },
         
           // Signature / Name of a person
            {
              // text: `(${this.productInvoice.clientName})`,
              text: `(${this.user.salesName})`,
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
        widths: ['*', '*', '*', '*', '*', '*'],
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
