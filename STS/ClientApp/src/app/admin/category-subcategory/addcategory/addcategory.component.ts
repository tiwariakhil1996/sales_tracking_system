import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categoryDataModel } from '../../../model/model';
import { CommonService } from '../../../service/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {


  category = new categoryDataModel();
  categoryDetails: categoryDataModel[]=[];
  
  constructor(private router:Router,private toastr: ToastrService,private productService:CommonService) { }

  ngOnInit() {
  }

  addCategory(){
    this.productService.addCategory(this.category).subscribe((data: any) => {
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
