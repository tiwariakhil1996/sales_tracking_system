import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../service/sales.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { salesregisterModel } from '../../model/sales';
import { registerModel } from '../../model/admin';
import { Router } from '@angular/router';

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

  RoleJason = {
    ROle: [0, 1],
    Component: "SalesdataComponent"
  }

  constructor(private salesService: SalesService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router:Router) {
    this.SalesList();
    // this.active_deactive_SalesList();
  }

  ngOnInit() {
    this.checkRole(this.RoleJason)
  }

  checkRole(RoleJason) {
    var result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component == RoleJason.Component) {
      console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['admin/login']);
      }
    }
  }

  openmodal(content) {
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
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
    console.log(this.sales.userid);

    this.salesService.RegisteredSalesList(this.sales).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.RegisteredSalesList) {
          this.salesDetails = data.RegisteredSalesList;
          console.log(this.salesDetails);

        }
      }
    }, (err) => {

    });
  }

  deleteSales(id: number) {
    this.salesService.deleteSales(id).subscribe(data => {
      // this.salesService.SalesList();
      this.SalesList();
    });
    this.toastr.success('Sales Account deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
    });
  }
  
  changeStatus(id: number) {
    console.log(id);
    this.salesService.changeStatus(id).subscribe(data => {
      this.SalesList();
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
