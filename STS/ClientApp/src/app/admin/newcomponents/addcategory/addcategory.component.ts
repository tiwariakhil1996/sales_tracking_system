import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categoryDataModel } from '../../../model/model';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {


  category = new categoryDataModel();
  categoryDetails: categoryDataModel[]=[];
  
  constructor(private router:Router,private productService:CommonService) { }

  ngOnInit() {
  }

  addCategory(){
    this.productService.addCategory(this.category).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Category added sucesfully');
        // this.categoryList();
      }
      this.category = new categoryDataModel();
    }, (err) => {

    });
  }


}
