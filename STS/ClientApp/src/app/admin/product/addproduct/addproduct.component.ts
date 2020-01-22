import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../model/model';
import { Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  product = new ProductModel();
  productDetails: ProductModel[] = [];
  constructor(
     private router: Router, 
    private productService: CommonService
  ) { }

  ngOnInit() {
  }
  submitForm(){
    this.productService.AddProduct(this.product).subscribe((data: any) => {
      if (data.Status.code === 0) {

        alert('Product Added sucesfully');
      }
    }, (err) => {


    });
  }

  resetForm(){

  }

}
