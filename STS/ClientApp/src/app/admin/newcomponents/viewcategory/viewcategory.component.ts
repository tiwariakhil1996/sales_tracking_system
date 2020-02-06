import { Component, OnInit } from "@angular/core";
import { categoryDataModel } from "../../../model/model";
import { Router } from "@angular/router";
import { CommonService } from "../../../service/common.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-viewcategory",
  templateUrl: "./viewcategory.component.html",
  styleUrls: ["./viewcategory.component.css"]
})
export class ViewcategoryComponent implements OnInit {
  category = new categoryDataModel();
  categoryDetails: categoryDataModel[] = [];

  constructor(
    private router: Router,
    private commonService: CommonService,
    private modalService: NgbModal
  ) {
    this.categoryList();
  }

  ngOnInit() {}

  categoryList() {
    this.commonService.categoryList().subscribe(
      (data: any) => {
        if (data.Status.code === 0) {
          if (data.CategoryList) {
            this.categoryDetails = data.CategoryList;
          }
        }
      },
      err => {
        console.log(this.categoryDetails);
      }
    );
  }

  // Delete

  deleteCategory(cid: number) {
    if (confirm("Are you sure to delete this record ?") === true) {
      this.commonService.deleteCategory(cid).subscribe(data => {
        this.commonService.categoryList();
        this.categoryList();
      });
    }
  }
  // Edit
  openupdatemodal(content, item) {
    this.category = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: "light-blue-backdrop" });
  }
  onEdit(cid: number) {
    // this.client.image = this.imageSrc;
    this.commonService.updateCategory(cid, this.category).subscribe(
      (data: any) => {
        if (data.Status.code === 0) {
          alert("Category updated sucesfully");
        }
        this.category = new categoryDataModel();
        this.categoryList();
      },
      err => {}
    );
  }
}
