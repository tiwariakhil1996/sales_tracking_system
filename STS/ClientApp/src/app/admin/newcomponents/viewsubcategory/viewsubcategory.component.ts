import { CategorySubcategoryService } from './../../../service/category-subcategory.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { subcategoryDataModel, categoryDataModel } from '../../../model/category-subcategory';

@Component({
  selector: 'app-viewsubcategory',
  templateUrl: './viewsubcategory.component.html',
  styleUrls: ['./viewsubcategory.component.css']
})
export class ViewsubcategoryComponent implements OnInit {

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[]=[];
  
  category = new categoryDataModel();
  categoryDetails: categoryDataModel[]=[];

  
  constructor(private router: Router, private categoryService: CategorySubcategoryService,private modalService: NgbModal) { 
    this.categoryList();
    this.viewsubcategoryList();
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
  
  viewsubcategoryList() {
    this.categoryService.viewsubcategoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ViewSubcategoryList) {
          this.subcategoryDetails = data.ViewSubcategoryList;
        }
      }
    }, (err) => {
      
      console.log(this.subcategoryDetails); 
    });
  }

  deleteSubcategory(sid: number) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.categoryService.deleteSubcategory(sid).subscribe(data => {
        this.categoryService.viewsubcategoryList();
        this.viewsubcategoryList();
      });
    }
  }
  
  // Edit
  openupdatemodal(content, item) {
    this.subcategory = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });

  }

  onEdit(sid: number) {
    // this.client.image = this.imageSrc;
    this.categoryService.updateSubcategory(sid, this.subcategory).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('SUbcategory updated sucesfully');
      }
      this.subcategory = new subcategoryDataModel();
      this.viewsubcategoryList();
    }, (err) => {
    });
  }



}
