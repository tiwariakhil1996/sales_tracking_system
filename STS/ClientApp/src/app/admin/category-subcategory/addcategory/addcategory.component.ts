import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';
import { categoryDataModel } from '../../../model/category-subcategory';
import { registerModel } from '../../../model/admin';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  user = new registerModel();

  category = new categoryDataModel();
  categoryDetails: categoryDataModel[] = [];

  constructor(private router: Router,
    private toastr: ToastrService,
    private categoryService: CategorySubcategoryService) { }

  ngOnInit() {
  }

  addCategory() {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.category.createdby = this.user.id;
    console.log(this.category.createdby);


    this.categoryService.addCategory(this.category).subscribe((data: any) => {
      if (data.Status.code === 0) {
        this.toastr.success('Category added succesfully', 'Successful', {
          disableTimeOut: false
        });
        this.categoryList();
      }  else {
        this.toastr.warning('Cannot add duplicate Category', 'Info', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
      this.category = new categoryDataModel();
    }, (err) => {

    });
  }

  categoryList() {
    this.categoryService.categoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList) {
          this.categoryDetails = data.CategoryList;
          console.log(this.categoryDetails);
        }
      }
    }, (err) => {

      console.log(this.categoryDetails);
    });
  }


  viewCategoryForm() {
    this.router.navigate(['/admin/category-subcategory/viewcategory']);
  }

}
