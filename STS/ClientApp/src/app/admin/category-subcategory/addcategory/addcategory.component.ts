import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';
import { categoryDataModel } from '../../../model/category-subcategory';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {


  category = new categoryDataModel();
  categoryDetails: categoryDataModel[]=[];
  
  constructor(private router:Router,private toastr: ToastrService,private categoryService:CategorySubcategoryService) { }

  ngOnInit() {
  }

  addCategory(){
    this.categoryService.addCategory(this.category).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Category added sucesfully');
        // this.categoryList();
        this.toastr.success('Category added succesfully', 'Successful', {
          disableTimeOut: false
        });
      }
      this.category = new categoryDataModel();
    }, (err) => {

    });
  }

  viewCategoryForm(){
    this.router.navigate(['/admin/category-subcategory/viewcategory']);

  }

}
