import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { subcategoryDataModel } from '../../../model/model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewsubcategory',
  templateUrl: './viewsubcategory.component.html',
  styleUrls: ['./viewsubcategory.component.css']
})
export class ViewsubcategoryComponent implements OnInit {
  
  modalRef: BsModalRef;

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[]=[];
  
  constructor(private router: Router, private commonService: CommonService,private modalServices: BsModalService,private modalService: NgbModal) { 
    this.viewsubcategoryList();
  }


  ngOnInit() {
  }

  
  viewsubcategoryList() {
    this.commonService.viewsubcategoryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ViewSubcategoryList) {
          this.subcategoryDetails = data.ViewSubcategoryList;
        }
      }
    }, (err) => {
      
      console.log(this.subcategoryDetails); 
    });
  }


  openupdatemodal(content,item) {
    this.subcategory = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    // this.viewData = JSON.parse(localStorage.getItem('Register')) || [];
  
  }
  

  updateSubcategory(sid:number) {
    // this.product.image = this.imageSrc;
    this.commonService.updateSubcategory(sid, this.subcategory).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Subcategory updated sucesfully');
      }
      this.subcategory = new subcategoryDataModel();
      this.viewsubcategoryList();
    }, (err) => {
    });
  }

  deleteSubcategory(sid: number) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.commonService.deleteSubcategory(sid).subscribe(data => {
        this.commonService.viewsubcategoryList();
        this.viewsubcategoryList();
      });
    }
  }

}
