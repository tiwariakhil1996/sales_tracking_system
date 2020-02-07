import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { productModel } from '../../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product = new productModel();
  productDetails: productModel[] = [];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
  }

  // submitForm(){
  //   this.productService.addProduct(this.product).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       alert('Product added sucesfully');
  //     }
  //   }, (err) => {


  //   });
  // }

  // resetForm(){

  // }
}
