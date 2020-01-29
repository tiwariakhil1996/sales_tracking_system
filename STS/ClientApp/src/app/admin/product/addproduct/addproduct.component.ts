import { Component, OnInit } from '@angular/core';
import { productModel } from '../../../model/model';
import { Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { DomSanitizer } from '@angular/platform-browser';
// import {DomSanitizatio.nService} from '@angular/platform-browser';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  errorMessage = '';
  imageSrc: string = '';

  product = new productModel();
  productDetails: productModel[] = [];


  constructor(private router: Router, private productService: CommonService,private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  submitForm() {
    this.product.image = this.imageSrc;
    this.productService.addProduct(this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Product added sucesfully');
        this.router.navigate(['admin/viewproduct']);
      }
      this.product = new productModel();
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
