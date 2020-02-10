import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';
import { subcategoryDataModel, categoryDataModel } from '../../../model/category-subcategory';
import { ToastrService } from 'ngx-toastr';
import { registerModel } from '../../../model/admin';

@Component({
  selector: 'app-viewsubcategory',
  templateUrl: './viewsubcategory.component.html',
  styleUrls: ['./viewsubcategory.component.css']
})
export class ViewsubcategoryComponent implements OnInit {

  modalRef: BsModalRef;
  
  user  = new registerModel();

  category = new categoryDataModel();
  categoryDetails: categoryDataModel[] = [];

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[] = [];

  constructor(private router: Router,
    private categoryService: CategorySubcategoryService,
    private modalServices: BsModalService,
    private modalService: NgbModal,
    private toastr: ToastrService) {
  
    this.viewsubcategoryList();
    this.categoryList();
  }


  ngOnInit() {
  }

  categoryList() {
    this.categoryService.categoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList) {
          this.categoryDetails = data.CategoryList;
          console.log(this.categoryDetails);
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


  openupdatemodal(content, item) {
    this.subcategory = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

  }


  updateSubcategory(sid: number) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.subcategory.modifiedby = this.user.id;
    console.log(this.subcategory.modifiedby);

    this.categoryService.updateSubcategory(sid, this.subcategory).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Subcategory updated sucesfully');
        this.toastr.success('Subcategory updated succesfully', 'Successful', {
          disableTimeOut: false
        });
      }
      this.subcategory = new subcategoryDataModel();
      this.viewsubcategoryList();
    }, (err) => {
    });
  }

  deleteSubcategory(sid: number) {
    // if (confirm('Are you sure to delete this record ?') === true) {
      this.categoryService.deleteSubcategory(sid).subscribe(data => {
        this.categoryService.viewsubcategoryList();
        this.viewsubcategoryList();
      });
    // }
    this.toastr.success('Subcategory is deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
    });
  }

  changeStatus(id: number) {
    console.log(id);
    this.categoryService.changesubcategoryStatus(id).subscribe(data => {
      this.viewsubcategoryList();
    });
  }

  addnewSubategory() {
    this.router.navigate(['/admin/category-subcategory/addsubcategory']);

  }
}
