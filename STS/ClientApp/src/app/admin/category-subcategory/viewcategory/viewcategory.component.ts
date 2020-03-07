import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';
import { categoryDataModel, paginationModel } from '../../../model/category-subcategory';
import { registerModel } from '../../../model/admin';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent implements OnInit {

  RowCount: number;
  pageSize: number = 5;
  totalPageList: paginationModel[] = [];
  
  user = new registerModel();

  modalRef: BsModalRef;
  category = new categoryDataModel();
  categoryDetails: categoryDataModel[] = [];

  RoleJason = {
    ROle: [0, 1],
    Component: 'ViewcategoryComponent'
  };

  constructor(
    private router: Router,
    private categoryService: CategorySubcategoryService,
    private modalServices: BsModalService,
    private modalService: NgbModal,
    private toastr: ToastrService) {
    // this.categoryList();
  }

  ngOnInit() {
    this.checkRole(this.RoleJason);

    this.categoryList();
    // const item = { pageIndex: 0 };
    // this.categoryList(item);
  }

  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      // console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['admin/login']);
      }
    }
  }

  categoryList() {
    // this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    // this.sales.userid = this.user.id;

    this.categoryService.categoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList) {
          this.categoryDetails = data.CategoryList;
          // console.log(this.categoryDetails);
        }
      }
    }, (err) => {

      // console.log(err);
    });
  }

  
  // categoryList(item) {
  //   // this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
  //   // this.sales.userid = this.user.id;

  //   // this.sales.pageIndex = item.pageIndex;
  //   // this.sales.pageSize = this.pageSize;

  //   this.categoryService.categoryList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.CategoryList) {
  //         this.categoryDetails = data.CategoryList;
  //         // console.log(this.categoryDetails);
  //       }
  //       if (data.RowCount) {
  //         this.RowCount = data.RowCount
  //       }
  //       var totalPageSize = Math.ceil(this.RowCount / this.pageSize);
  //       console.log(totalPageSize);
        
  //       this.totalPageList = [];
  //       for (var i = 0; i < totalPageSize; i++) {
  //         this.totalPageList.push({ pageSize: i + 1, pageIndex: i })

  //       }
  //     }
  //   }, (err) => {

  //     // console.log(err);
  //   });
  // }

  openupdatemodal(content, item) {
    this.category = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

  }


  updateCategory(cid: number) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.category.modifiedby = this.user.id;
    // console.log(this.category.modifiedby);


    this.categoryService.updateCategory(cid, this.category).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Category updated sucesfully');
        this.toastr.success('Category updated succesfully', 'Successful', {
          disableTimeOut: false
        });
      }
      this.category = new categoryDataModel();
       this.categoryList();
    //   const item = { pageIndex: 0 };
    // this.categoryList(item);
    }, (err) => {
    });
  }

  // Delete

  deleteCategory(cid: number) {
    // if (confirm('Are you sure to delete this record ?') === true) {
    this.categoryService.deleteCategory(cid).subscribe(data => {
     this.categoryList();
    //   const item = { pageIndex: 0 };
    // this.categoryList(item);
    });
    // }
    this.toastr.success('Category deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
    });
  }

  changeStatus(id: number) {
    // console.log(id);
    this.categoryService.changeStatus(id).subscribe(data => {
      this.categoryList();
    //   const item = { pageIndex: 0 };
    // this.categoryList(item);
    });
  }

  addnewCategory() {
    this.router.navigate(['/admin/category-subcategory/addcategory']);
  }
}
