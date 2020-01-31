import { CategorySubcategoryService } from './../../../service/category-subcategory.service';
import { Component, OnInit } from '@angular/core';
import { SubcategoryModel, CategoryModel } from '../../../model/model';

@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.css']
})
export class AddsubcategoryComponent implements OnInit {

  Category=new CategoryModel();
  CategoryDetail:CategoryModel[]=[];

  Subcategory=new SubcategoryModel();
  SubcategoryDetails:SubcategoryModel[]=[];

  
 
  constructor(private subcategory:CategorySubcategoryService, )
   { 
    this.categoryList()
   }

  ngOnInit() {
  }
  submitForm(){
    this.subcategory.addSubcategory(this.Subcategory).subscribe((data:any)=>{
      if (data.Status.code===0) {

        alert('Add Subcategory Successfully');
        // this.router.navigate(["/admin/demoallapi"]);
      }
      this.Subcategory=new SubcategoryModel();
    },(err)=>{

    });

  }
  
  categoryList() {
    this.subcategory.categoryList().subscribe((data: any) => {
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
