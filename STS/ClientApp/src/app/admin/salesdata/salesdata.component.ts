import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../service/sales.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { salesregisterModel, paginationModel } from '../../model/sales';
import { registerModel } from '../../model/admin';
import { Router } from '@angular/router';
import { SendMailModel } from '../../model/sendmail';
import { SendEmailService } from '../../service/sendemail.service';

@Component({
  selector: 'app-salesdata',
  templateUrl: './salesdata.component.html',
  styleUrls: ['./salesdata.component.css']
})  
export class SalesdataComponent implements OnInit {

  modalRef: BsModalRef;

  user = new registerModel();

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];

  // RowCount: number;
  // pageSize: number = 6;
  // totalPageList: paginationModel[] = [];

  search_ : any;

  // Pagination
  RowCount: number;
  pageSize: number = 5;
  totalPageList: paginationModel[] = [];
  totalPageSize:number;
  pagesize:any;
  currentPageIndex: number = 0;
  pageOfItems: Array<any>;

  // Authentication
  RoleJason = {
    ROle: [0, 1],
    Component: 'SalesdataComponent'
  };

  constructor(private salesService: SalesService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private sendmail: SendEmailService,
    private router: Router) {
    // this.SalesList();
    // this.active_deactive_SalesList();
  }

  ngOnInit() {
    this.checkRole(this.RoleJason);

    const item = { pageIndex: 0 };
    this.SalesList(item);
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

  openmodal(content) {
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  password_reset_modal(item,password_reset) {
    this.user = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(password_reset, {size: 'sm', backdropClass: 'light-blue-backdrop' });
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

  // SalesList() {
  //   this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
  //   this.sales.userid = this.user.id;
  //   // console.log(this.sales.userid);

  //   this.salesService.RegisteredSalesList(this.sales).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.RegisteredSalesList) {
  //         this.salesDetails = data.RegisteredSalesList;
  //         // console.log(this.salesDetails);

  //       }
  //     }
  //   }, (err) => {

  //   });
  // }


  Sendmail() {
    
    let getemail = new SendMailModel();
    getemail.UsernameEmail = this.user.email;
    this.sendmail.send_sales_mail(getemail).subscribe((data: any) => {
      if (data.Status.code === 0) {
      this.toastr.success('Password reset request link has been sent to your email', '', {
        disableTimeOut: false,
        timeOut: 5000
      });
      this.modalService.dismissAll();
    } else {
      this.toastr.warning('This email id is not registered', 'Warning', {
        disableTimeOut: false
      });
    }
  },(err) => {

  } );
  }
  
  onsearch() {
    const item = { pageIndex: 0 };
    this.SalesList(item);
  }

  SalesList(item) {
    // this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.sales.userid = this.user.id;
    // console.log(this.sales.userid);
    this.sales.pageIndex = item.pageIndex;
    this.sales.pageSize = this.pageSize;

    this.sales.search = this.search_;

    this.salesService.RegisteredSalesList(this.sales).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.RegisteredSalesList) {
          this.salesDetails = data.RegisteredSalesList;

        }
        if (data.RowCount) {
          this.RowCount = data.RowCount
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
  
  deleteSales(id: number) {
    this.salesService.deleteSales(id).subscribe(data => {
      // this.salesService.SalesList();
      // this.SalesList();
      const item = { pageIndex: 0 };
      this.SalesList(item);
    });

    this.toastr.success('Sales Account deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
    });
    this.modalService.dismissAll();
  }

  changeStatus(id: number) {
    // console.log(id);
    this.salesService.changeStatus(id).subscribe(data => {
      // this.SalesList();
      const item = { pageIndex: 0 };
      this.SalesList(item);
    });
  }

  // active_deactive_SalesList() {
  //   this.salesService.active_SalesList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.SalesList_ActiveDeactive) {
  //         this.salesDetails = data.SalesList_ActiveDeactive;

  //       }
  //     }
  //   }, (err) => {

  //     console.log(this.salesDetails);
  //   });
  // }


}
