import { Component, OnInit } from '@angular/core';
import { productModel } from '../../../model/model';
import { Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  product = new productModel();
  productDetails: productModel[] = [];

  constructor(private router: Router, private productService: CommonService) { }

  ngOnInit() {
  }

  submitForm(){
    this.productService.addProduct(this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Product added sucesfully');
      }
    }, (err) => {


    });
  }

  resetForm(){

  }


}
