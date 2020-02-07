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
  salesDetails: salesregisterModel[]=[];
  
  constructor(private salesService: SalesService,
    private modalService: NgbModal,
    private toastr: ToastrService) { 
    this.SalesList();
  }

  ngOnInit() {
  }

  openmodal(content) {
  // data show in model use this line and store the data in user and display in ui
  this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
}


  SalesList(){
    this.salesService.SalesList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.RegisteredSalesList) {
          this.salesDetails = data.RegisteredSalesList;
        }
      }
    }, (err) => {

    });
  }

  // deleteSales(id: number) {
  //   if (confirm('Are you sure to delete this record ?') === true) {
  //     this.salesService.deleteSales(id).subscribe(data => {
  //       this.salesService.SalesList();
  //       this.SalesList();
  //     });
  //     this.toastr.success('Sales Account deleted Successful', 'Successful', {
  //       disableTimeOut: false,
  //       timeOut: 2000
  //     });
  //   }
  // }

   deleteSales(id: number) {
      this.salesService.deleteSales(id).subscribe(data => {
        this.salesService.SalesList();
        this.SalesList();
      });
      this.toastr.success('Sales Account deleted Successful', 'Successful', {
        disableTimeOut: false,
        timeOut: 2000
      });
  }


}
