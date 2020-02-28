import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent implements OnInit {

  RoleJason = {
    ROle: [0, 1],
    Component: "ProductImagesComponent"
  }

  constructor(private router:Router) { }

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

}
