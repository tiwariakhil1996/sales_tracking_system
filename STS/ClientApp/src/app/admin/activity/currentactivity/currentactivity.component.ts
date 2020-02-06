import { Component, OnInit } from '@angular/core';
import { activityModel, salesregisterModel, productModel, clientModel } from '../../../model/model';
import { CommonService } from '../../../service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesService } from '../../../service/sales.service';

@Component({
  selector: 'app-currentactivity',
  templateUrl: './currentactivity.component.html',
  styleUrls: ['./currentactivity.component.css']
})
export class CurrentactivityComponent implements OnInit {
  
  activity = new activityModel();
  activityDetails: activityModel[]=[];

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[]=[];

  product = new productModel();
  productDetails: productModel[] = [];

  client = new clientModel();
  clientDetails: clientModel[] = [];
  
  constructor(private activityService:CommonService,private modalService: NgbModal,private salesService:SalesService) { 
    this.activityList();
    this.productList();
    this.clientList();
    this.SalesList();
   
  }

  
  ngOnInit() {
  }

// Delete

onDelete(aid: number) {
  if (confirm('Are you sure to delete this record ?') === true) {
    this.activityService.deleteActivity(aid).subscribe(data => {
      this.activityService.activityList();
      this.activityList();
    });
  }
}

activityList() {
  this.activityService.activityList().subscribe((data: any) => {
    if (data.Status.code === 0) {
      if (data.ActivityList) {
        this.activityDetails = data.ActivityList;
      }
    }
  }, (err) => {

  });
}


//Edit
openupdatemodal(content, item) {
  this.activity = JSON.parse(JSON.stringify(item));
// data show in model use this line and store the data in user and display in ui
this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
// this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

}

onEdit(aid:number) {
this.activityService.updateActivity(aid, this.activity).subscribe((data: any) => {
  if (data.Status.code === 0) {
    alert('Activity updated sucesfully');
  }
  this.activity = new activityModel();
  this.activityList();
}, (err) => {
});
}

// Display

productList() {
  this.activityService.productList().subscribe((data: any) => {
    if (data.Status.code === 0) {
      if (data.ProductList) {
        this.productDetails = data.ProductList;
      }
    }
  }, (err) => {

  });
}

clientList() {
  this.activityService.clientList().subscribe((data: any) => {
    if (data.Status.code === 0) {
      if (data.ClientList) {
        this.clientDetails = data.ClientList;
      }
    }
  }, (err) => {

  });
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

}
