import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../../model/model';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent implements OnInit {

  Category=new CategoryModel();
  CategoryDetail:CategoryModel[]=[];
  
  constructor(private categoryService:CategorySubcategoryService ) 
    { 
      this.categoryList();
    }

  ngOnInit() {
  }

  categoryList() {
    this.categoryService.categoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList) {
          this.CategoryDetail = data.CategoryList;
        
        }
      }
    }, (err) => {
      
      console.log(this.CategoryDetail); 
    });
  }



}
