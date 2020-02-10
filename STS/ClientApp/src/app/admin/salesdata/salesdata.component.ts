import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../service/sales.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { salesregisterModel } from '../../model/sales';

@Component({
  selector: 'app-salesdata',
  templateUrl: './salesdata.component.html',
  styleUrls: ['./salesdata.component.css']
})
export class SalesdataComponent implements OnInit {

  modalRef: BsModalRef;

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];

  constructor(private salesService: SalesService,
    private modalService: NgbModal,
    private toastr: ToastrService) {
    this.SalesList();
    // this.active_deactive_SalesList();
  }

  ngOnInit() {
  }

  openmodal(content) {
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
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
