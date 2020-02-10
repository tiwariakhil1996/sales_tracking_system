import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesService } from '../../../service/sales.service';
import { ProductService } from '../../../service/product.service';
import { ClientService } from '../../../service/client.service';
import { ActivityService } from '../../../service/activity.service';
import { activityModel} from '../../../model/activity';
import { salesregisterModel } from '../../../model/sales';
import { productModel } from '../../../model/product';
import { clientModel } from '../../../model/client';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-currentactivity',
  templateUrl: './currentactivity.component.html',
  styleUrls: ['./currentactivity.component.css']
})
export class CurrentactivityComponent implements OnInit {

  user = new salesregisterModel();

  activity = new activityModel();
  activityDetails: activityModel[]=[];

  sales = new salesregisterModel();
  salesDetails: salesregisterModel[]=[];

  product = new productModel();
  productDetails: productModel[] = [];

  client = new clientModel();
  clientDetails: clientModel[] = [];
  
  constructor(private clienService:ClientService,
    private activityService: ActivityService,
    private modalService: NgbModal,
    private salesService:SalesService,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService) { 
    this.activityList();
    this.productList();
    this.clientList();
    this.SalesList();


  }

  
  ngOnInit() {
  }

// Delete

onDelete(aid: number) {
  // if (confirm('Are you sure to delete this record ?') === true) {
    this.activityService.deleteActivity(aid).subscribe(data => {
      // this.activityService.activityList();
       this.activityList();
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

//Edit
openupdatemodal(content, item) {
  this.activity = JSON.parse(JSON.stringify(item));
// data show in model use this line and store the data in user and display in ui
this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
// this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

}

onEdit(aid:number) {
  this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
  this.activity.modifiedby = this.user.id;
  console.log(this.activity.modifiedby);
  
this.activityService.updateActivity(aid, this.activity).subscribe((data: any) => {
  if (data.Status.code === 0) {
    // alert('Activity updated sucesfully');
    this.toastr.success('Activity is updated sucesfully', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
    });
  }
  this.activity = new activityModel();
  // this.activityList();
}, (err) => {
});
}

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

addnewActivity() {
  this.router.navigate(['/sales/activity/addactivity']);

}
changeStatusInProgress(aid: number) {
  console.log(aid);
  this.activityService.changeStatusInProgress(aid).subscribe(data => {
    this.activityList();
  });
}


}
