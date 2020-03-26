import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorySubcategoryService } from '../../../service/category-subcategory.service';
import { subcategoryDataModel, categoryDataModel, paginationModel } from '../../../model/category-subcategory';
import { ToastrService } from 'ngx-toastr';
import { registerModel } from '../../../model/admin';

@Component({
  selector: 'app-viewsubcategory',
  templateUrl: './viewsubcategory.component.html',
  styleUrls: ['./viewsubcategory.component.css']
})
export class ViewsubcategoryComponent implements OnInit {

  modalRef: BsModalRef;

  user = new registerModel();

  category = new categoryDataModel();
  categoryDetails: categoryDataModel[] = [];

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[] = [];

  // Pagination
  RowCount: number;
  pageSize: number = 5;
  totalPageList: paginationModel[] = [];
  totalPageSize: number;
  pagesize: any;
  currentPageIndex: number = 0;
  pageOfItems: Array<any>;
  search_: any;

  RoleJason = {
    ROle: [0, 1],
    Component: 'ViewsubcategoryComponent'
  };

  constructor(private router: Router,
    private categoryService: CategorySubcategoryService,
    private modalServices: BsModalService,
    private modalService: NgbModal,
    private toastr: ToastrService) {


    // this.viewsubcategoryList();
    this.categoryList();
  }


  ngOnInit() {
    this.checkRole(this.RoleJason);

    const item = { pageIndex: 0 };
    this.viewsubcategoryList(item);
  }

  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['admin/login']);
      }
    }
  }

  categoryList() {
    this.categoryService.categoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CategoryList) {
          this.categoryDetails = data.CategoryList;
          // console.log(this.categoryDetails);
        }
      }
    }, (err) => {

      console.log(err);
    });
  }




  // viewsubcategoryList() {
  //   this.categoryService.viewsubcategoryList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.ViewSubcategoryList) {
  //         this.subcategoryDetails = data.ViewSubcategoryList;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }


  onsearch() {
    const item = { pageIndex: 0 };
    this.viewsubcategoryList(item);
  }

  viewsubcategoryList(item) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.subcategory.userid = this.user.id;

    this.subcategory.pageIndex = item.pageIndex;
    this.subcategory.pageSize = this.pageSize;
    this.subcategory.search = this.search_;

    this.categoryService.admin_viewsubcategoryList(this.subcategory).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.admin_subcategoryList) {
          this.subcategoryDetails = data.admin_subcategoryList;
        }
        if (data.RowCount) {
          this.RowCount = data.RowCount;
        }
        this.totalPageSize = Math.ceil(this.RowCount / this.pageSize);

        this.totalPageList = [];
        for (var i = 0; i < this.totalPageSize; i++) {
          this.totalPageList.push({ pageSize: i + 1, pageIndex: i })

        }
        this.currentPageIndex = item.pageIndex;
      }
    }, (err) => {

    });
  }


  openupdatemodal(content, item) {
    this.subcategory = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];

  }


  updateSubcategory(sid: number) {
    let strError = '';

    if (!this.subcategory.cid) {
      strError += strError = '- Please select category';
    } else
      if (!this.subcategory.sname) {
        strError += strError = '' ? '' : '<br/>';
        strError += '- Please select subcategory';
      }

    if (strError !== '') {
      this.toastr.warning(strError, 'Warning', {
        disableTimeOut: false,
        timeOut: 2000,
        enableHtml: true,
        progressBar: true,
        closeButton: true,
      });
      return false;
    }

    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.subcategory.modifiedby = this.user.id;
    // console.log(this.subcategory.modifiedby);

    this.categoryService.updateSubcategory(sid, this.subcategory).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Subcategory updated sucesfully');
        this.toastr.success('Subcategory updated succesfully', 'Successful', {
          disableTimeOut: false
        });
        this.modalService.dismissAll();
      }
      this.subcategory = new subcategoryDataModel();
      // this.viewsubcategoryList();
      const item = { pageIndex: 0 };
      this.viewsubcategoryList(item);
    }, (err) => {
    });
  }

  deleteSubcategory(sid: number) {
    // if (confirm('Are you sure to delete this record ?') === true) {
    this.categoryService.deleteSubcategory(sid).subscribe(data => {
      this.categoryService.viewsubcategoryList();
      // this.viewsubcategoryList();
      const item = { pageIndex: 0 };
      this.viewsubcategoryList(item);
    });
    // }
    this.toastr.success('Subcategory is deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
    });
  }

  changeStatus(id: number) {
    // console.log(id);
    this.categoryService.changesubcategoryStatus(id).subscribe(data => {
      // this.viewsubcategoryList();
      const item = { pageIndex: 0 };
      this.viewsubcategoryList(item);
    });
  }

  addnewSubategory() {
    this.router.navigate(['/admin/category-subcategory/addsubcategory']);

  }
}
