import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';
import { categoryDataModel, subcategoryDataModel } from '../../../model/category-subcategory';
import { registerModel } from '../../../model/admin';

@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.css']
})
export class AddsubcategoryComponent implements OnInit {

  user = new registerModel();

  category = new categoryDataModel();
  categoryDetails: categoryDataModel[] = [];

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[] = [];

  RoleJason = {
    ROle: [0, 1],
    Component: 'Addsubcategory'
  };

  constructor(private router: Router,
    private toastr: ToastrService,
    private categoryService: CategorySubcategoryService, ) {
    this.active_CategoryList();
  }

  ngOnInit() {
    this.checkRole(this.RoleJason);
  }

  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      // console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['admin/login']);
      }
    }
  }

  

  active_CategoryList() {
    this.categoryService.active_CategoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList_ActiveDeactive) {
          this.categoryDetails = data.CategoryList_ActiveDeactive;

        }
      }
    }, (err) => {

      // console.log(this.categoryDetails);
    });
  }

  addSubcategory() {
    let strError = '';

    if (!this.subcategory.cid) {
      strError += strError = '- Please select category';
    } else
      if (!this.subcategory.sname) {
        strError += strError = '' ? '' : '<br/>';
        strError += '- Please select subcategory';
      }

      if (strError !== '') {
        this.toastr.warning(strError, 'Warning', {
          disableTimeOut: false,
          timeOut: 2000,
          enableHtml: true,
          progressBar: true,
          closeButton: true,
        });
        return false;
      }

    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.subcategory.createdby = this.user.id;
    // console.log(this.subcategory.createdby);


    this.categoryService.addSubcategory(this.subcategory).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Subcategory added sucesfully');
        // this.subcategoryList(cid);
        this.toastr.success('Subcategory added succesfully', 'Successful', {
          disableTimeOut: false
        });
      }
      this.subcategory = new subcategoryDataModel();
    }, (err) => {

    });

  }

  subcategoryList(catid) {
    this.categoryService.subcategoryList(catid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.SubcategoryList) {
          this.subcategoryDetails = data.SubcategoryList;
        }
      }
    }, (err) => {

      // console.log(this.subcategoryDetails);
    });
  }


  viewSubcategoryForm() {
    this.router.navigate(['/admin/category-subcategory/viewsubcategory']);

  }
}
