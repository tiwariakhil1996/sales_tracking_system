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

  // public imageUrl = "https://localhost:44317/Document/Images/Product/";
  RoleJason = {
    ROle: [0, 1],
    Component: "ProductComponent"
  }

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.checkRole(this.RoleJason)
  }

  checkRole(RoleJason) {
    var result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component == RoleJason.Component) {
      console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['admin/login']);
      }
    }
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
