import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';
import { categoryDataModel } from '../../../model/category-subcategory';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent implements OnInit {

  modalRef: BsModalRef;
  category = new categoryDataModel();
  categoryDetails: categoryDataModel[] = [];

  constructor(
    private router: Router,
    private categoryService: CategorySubcategoryService,
    private modalServices: BsModalService,
    private modalService: NgbModal,
    private toastr: ToastrService) {
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

  openupdatemodal(content, item) {
    this.category = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

  }


  updateCategory(cid: number) {
    // this.product.image = this.imageSrc;
    this.categoryService.updateCategory(cid, this.category).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Category updated sucesfully');
        this.toastr.success('Category updated succesfully', 'Successful', {
          disableTimeOut: false
        });
      }
      this.category = new categoryDataModel();
      this.categoryList();
    }, (err) => {
    });
  }

  // Delete

  deleteCategory(cid: number) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.categoryService.deleteCategory(cid).subscribe(data => {
        this.categoryList();
      });
    }
  }

  changeStatus(id: number) {
    console.log(id);
    this.categoryService.changeStatus(id).subscribe(data => {
      this.categoryList();
    });
  }

  addnewCategory() {
    this.router.navigate(['/admin/category-subcategory/addcategory']);
  }
}
