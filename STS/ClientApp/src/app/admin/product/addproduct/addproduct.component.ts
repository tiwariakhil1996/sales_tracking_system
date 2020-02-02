import { Component, OnInit } from '@angular/core';
import { productModel, CategoryModel, SubcategoryModel } from '../../../model/model';
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
    private domSanitizer: DomSanitizer,
    private subcategory: CategorySubcategoryService) {
    this.categoryList();
    // this.subcategoryList();

  }

  ngOnInit() {
  }

  submitForm() {
    this.product.image = this.imageSrc;
    this.product.category_id = Number(this.product.category_id);
    this.product.subcategory_id = Number(this.product.subcategory_id);
    this.product.image = this.imageSrc;
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
  subcategoryList(catId) {
    this.subcategory.subcategoryList(catId).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.SubcategoryList) {
          this.SubcategoryDetails = data.SubcategoryList;
        }
      }

    }, (err) => {

    });
  }



  // Image to Base64

  handleInputChange(e) {
    var file = e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file)
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    // this.imageSrc = domSanitizer.bypassSecurityTrustUrl(reader.result);
    //  console.log(this.imageSrc);S
    this.imageSrc = reader.result;
    // console.log(this.imageSrc);
  }


  resetForm() {

  }


}
