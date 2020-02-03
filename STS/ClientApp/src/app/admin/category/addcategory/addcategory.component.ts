import { CategoryModel } from './../../../model/model';
import { Component, OnInit } from '@angular/core';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  Category=new CategoryModel();
  CategoryDetail:CategoryModel[]=[];

  constructor(
       private category:CategorySubcategoryService
  ) { }

  ngOnInit() {
  }

  submitForm(){
    this.category.addCategory(this.Category).subscribe((data:any)=>{
      if (data.Status.code===0) {

        alert('Add category Successfully');
        // this.router.navigate(["/admin/demoallapi"]);
      }
      this.Category=new CategoryModel();
    },(err)=>{

    });
}

}
