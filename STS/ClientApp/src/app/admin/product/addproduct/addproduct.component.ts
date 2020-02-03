import { CategoryModel, SubcategoryModel, productModel } from './../../../model/model';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';

// import {DomSanitizatio.nService} from '@angular/platform-browser';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  errorMessage = '';
  imageSrc: string = '';

  Category = new CategoryModel();
  CategoryDetail: CategoryModel[] = [];

  Subcategory = new SubcategoryModel();
  SubcategoryDetails: SubcategoryModel[] = [];

  product = new productModel();
  productDetails: productModel[] = [];

 
  constructor(
    private router: Router,
    private productService: CommonService,
    private subcategory: CategorySubcategoryService) {
    this.categoryList();
    // this.subcategoryList();

  }

  
  ngOnInit() {
     
  }


  addCategory(){
    this.productService.addCategory(this.Category).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Category added sucesfully');
        this.categoryList();
      }
      this.Category = new CategoryModel();
    }, (err) => {

    });
  }

    
  

  onCategoryChange(cid) {
    // this.subcategoryDetails = this.subcategoryDetails.filter(item => item.cid == cid);
    this.subcategoryList(cid);
  }


  addSubategory(){
    this.productService.addSubategory(this.subcategory).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Subcategory added sucesfully');
        // this.subcategoryList(cid);
      }
      this.Subcategory = new SubcategoryModel();
    }, (err) => {

    });

  }

  subcategoryList(catid) {
    this.productService.subcategoryList(catid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.SubcategoryList) {
          this.SubcategoryDetails = data.SubcategoryList;
        }
      }
    }, (err) => {
      
      console.log(this.SubcategoryDetails); 
    });
  }

  submitForm() {
    // this.product.image = this.imageSrc;
    this.productService.addProduct(this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Product added sucesfully');

        // this.router.navigate(['admin/product/viewproduct']);
      }
      this.product = new productModel();
    }, (err) => {


    });
  }
  //category display in the dropdown 

  onSelect(id) {
    // console.log(id);

    // this.SubcategoryDetails = this.SubcategoryDetails.filter(item => item.category_id == id);
    // console.log(this.SubcategoryDetails);
    this.subcategoryList(id);
  }

  categoryList() {

    this.subcategory.categoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList) {
          this.CategoryDetail = data.CategoryList;

        }
      }
    }, (err) => {

      console.log(this.CategoryDetail);
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
