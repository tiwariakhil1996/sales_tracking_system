import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';
import { categoryDataModel, subcategoryDataModel } from '../../../model/category-subcategory';

@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.css']
})
export class AddsubcategoryComponent implements OnInit {


  category = new categoryDataModel();
  categoryDetails: categoryDataModel[]=[];

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[]=[];
  
  constructor(private router: Router,
    private toastr: ToastrService,
    private categoryService: CategorySubcategoryService,) {
    this.categoryList();
   }

  ngOnInit() {
  }
   
  categoryList() {
    this.categoryService.categoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList) {
          this.categoryDetails = data.CategoryList;
        
        }
      }
    }, (err) => {
      
      console.log(this.categoryDetails); 
    });
  }



  addSubcategory(){
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
