import { Component, OnInit } from '@angular/core';
import { productModel } from '../../../model/model';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  product = new productModel();
  productDetails: productModel[] = [];

  constructor(private router: Router, private productService: CommonService) {
    this.productList();


  }
  ngOnInit() {
  }

  //Display

  productList(){
    this.productService.productList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ProductList) {
          this.productDetails = data.ProductList;
        }
      }
    }, (err) => {

    });
  }

  //Edit

  openBackDropCustomClass(){

  }

 
  //Delete

  onDelete(){

  }
}
