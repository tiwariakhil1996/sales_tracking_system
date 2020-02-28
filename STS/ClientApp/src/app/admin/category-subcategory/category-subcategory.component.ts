import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-subcategory',
  templateUrl: './category-subcategory.component.html',
  styleUrls: ['./category-subcategory.component.css']
})
export class CategorySubcategoryComponent implements OnInit {

  RoleJason = {
    ROle: [0, 1],
    Component: "CategorySubcategoryComponent"
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
