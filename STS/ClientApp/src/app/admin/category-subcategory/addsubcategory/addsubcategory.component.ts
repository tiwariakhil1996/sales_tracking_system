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

  adminDetails: registerModel = new registerModel();
  
  category = new categoryDataModel();
  categoryDetails: categoryDataModel[]=[];

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[]=[];
  
  constructor(private router: Router,
    private toastr: ToastrService,
    private categoryService: CategorySubcategoryService,) {
    this.active_CategoryList();
   }

  ngOnInit() {
  }
   
  // categoryList() {
  //   this.categoryService.categoryList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.CategoryList) {
  //         this.categoryDetails = data.CategoryList;
        
  //       }
  //     }
  //   }, (err) => {
      
  //     console.log(this.categoryDetails); 
  //   });
  // }

  active_CategoryList() {
    this.categoryService.active_CategoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList_ActiveDeactive) {
          this.categoryDetails = data.CategoryList_ActiveDeactive;

        }
      }
    }, (err) => {

      console.log(this.categoryDetails);
    });
  }

  addSubcategory(){
    this.adminDetails = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.subcategory.id =this.adminDetails.id;
    console.log(this.subcategory.id);
    

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
      
      console.log(this.subcategoryDetails); 
    });
  }


  viewSubcategoryForm(){
    this.router.navigate(['/admin/category-subcategory/viewsubcategory']);

  }
}
