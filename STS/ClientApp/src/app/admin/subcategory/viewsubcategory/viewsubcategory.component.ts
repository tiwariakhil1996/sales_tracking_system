import { Component, OnInit } from '@angular/core';
import { CategoryModel, SubcategoryModel } from '../../../model/model';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';

@Component({
  selector: 'app-viewsubcategory',
  templateUrl: './viewsubcategory.component.html',
  styleUrls: ['./viewsubcategory.component.css']
})
export class ViewsubcategoryComponent implements OnInit {

  Category=new CategoryModel();
  CategoryDetail:CategoryModel[]=[];

  Subcategory=new SubcategoryModel();
  SubcategoryDetails:SubcategoryModel[]=[];

  constructor(
    private subcategory:CategorySubcategoryService
  ) {
    this.subcategoryList();
   }

  ngOnInit() {
  }

  subcategoryList() {
    console.log(this.Subcategory);
    this.subcategory.subcategoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.SubcategoryList) {
          this.SubcategoryDetails = data.SubcategoryList;
        }
      }

    }, (err) => {

    });
  }

}
