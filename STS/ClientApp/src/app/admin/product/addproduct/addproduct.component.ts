import { Component, OnInit } from '@angular/core';
import { productModel, categoryDataModel, subcategoryDataModel } from '../../../model/model';
import { Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';


// import {DomSanitizatio.nService} from '@angular/platform-browser';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  errorMessage = '';
  imageSrc: string = '';
  modalRef: BsModalRef;
  // myDate = new Date();
  currentDate = new Date();

  product = new productModel();
  productDetails: productModel[] = [];

  category = new categoryDataModel();
  categoryDetails: categoryDataModel[]=[];

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[]=[];

  constructor(private router: Router, private productService: CommonService,private modalServices: BsModalService,    private modalService: NgbModal) {
    this.categoryList();
    // this.subcategoryList();
    // this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    
   }

  ngOnInit() {
   
  }
  

  openupdatemodal(content) {
  // data show in model use this line and store the data in user and display in ui
  this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

}
  openupdatemodal1(content1) {
    // this.product;
  // data show in model use this line and store the data in user and display in ui
  this.modalService.open(content1, { backdropClass: 'light-blue-backdrop' });
  // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

}

  addCategory(){
    this.productService.addCategory(this.category).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Category added sucesfully');
        this.categoryList();
      }
      this.category = new categoryDataModel();
    }, (err) => {

    });
  }

    
  categoryList() {
    this.productService.categoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList) {
          this.categoryDetails = data.CategoryList;
        
        }
      }
    }, (err) => {
      
      console.log(this.categoryDetails); 
    });
  }


  onCategoryChange(cid) {
    // this.subcategoryDetails = this.subcategoryDetails.filter(item => item.cid == cid);
    this.subcategoryList(cid);
  }


  addSubcategory(){
    this.productService.addSubcategory(this.subcategory).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Subcategory added sucesfully');
        // this.subcategoryList(cid);
      }
      this.subcategory = new subcategoryDataModel();
    }, (err) => {

    });

  }

  subcategoryList(catid) {
    this.productService.subcategoryList(catid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.SubcategoryList) {
          this.subcategoryDetails = data.SubcategoryList;
        }
      }
    }, (err) => {
      
      console.log(this.subcategoryDetails); 
    });
  }

  submitForm() {
    // this.product.image = this.imageSrc;
    this.productService.addProduct(this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Product added sucesfully');
      }
      this.product = new productModel();
    }, (err) => {


    });
  }







  // Image to Base64

  handleFileInput(fileList: FileList) {
    const preview = document.getElementById('photos-preview');
    Array.from(fileList).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);
        const imageDetail = String(reader.result).split(';base64,');
        this.product.image = imageDetail[1];
        this.product.ImageExtn = '.' + imageDetail[0].replace('data:image/', '');
        image.height = 100;
        image.width = 100;
        preview.appendChild(image);
      };
      reader.readAsDataURL(file);
      console.log(file);

    });
  }

  resetForm() {

  }


}
