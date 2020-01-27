import { Component, OnInit } from '@angular/core';
import { productModel } from '../../../model/model';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  // modalRef: BsModalRef;
  product = new productModel();
  productDetails: productModel[] = [];

  constructor(private router: Router,
    private productService: CommonService,
    public sanitizer: DomSanitizer
    // private modalServices: BsModalService,
    // private modalService: NgbModal
    ) {
        this.productList();
   }

  ngOnInit() {
  }

  openBackDropCustomClass(content, item) {

    //this.product = item;
    // data show in model use this line and store the data in user and display in ui
    //this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

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

  // Edit

  onEdit(id) {
  //   this.registerDetails=JSON.parse(localStorage.getItem("Register"))||[];
  //  this.registerDetails.forEach((element, index) => {
  //    console.log(index, element);

  //    if (this.register.id == element.id) {
  //        this.registerDetails[index]=this.register;
  //        localStorage.setItem('Register', JSON.stringify(this.registerDetails));
  //      // console.log(userIndex);
  //    }

  //  });

  // this.register = new registerModel();
  // this.registerImg = new registerImg();

 }


  // Delete

  onDelete() {

  }
}
