import { Component, OnInit } from '@angular/core';
import { categoryDataModel } from '../../../model/model';
import { Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent implements OnInit {

  
  category = new categoryDataModel();
  categoryDetails: categoryDataModel[]=[];
  
  constructor(private router: Router, private commonService: CommonService) { 
    this.categoryList();
  }

  ngOnInit() {
  }

  categoryList() {
    this.commonService.categoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList) {
          this.categoryDetails = data.CategoryList;
        
        }
      }
    }, (err) => {
      
      console.log(this.categoryDetails); 
    });
  }

  
  // Delete

  deleteCategory(cid: number) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.commonService.deleteCategory(cid).subscribe(data => {
        this.commonService.categoryList();
        this.categoryList();
      });
    }
  }

}
