import { CommonService } from './../../../service/common.service';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../model/model';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {


  product = new ProductModel();
  productDetails: ProductModel[] = [];

  constructor(
    private ProductService:CommonService
    )
   {
      this.ProductDetails();

    }

  ngOnInit() {

  }

  ProductDetails(){
    this.ProductService.ProductDetails().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ProductDetails) {
          this.productDetails = data.ProductDetails;
        }
      }
    }, (err) => {

    });
  }

}
