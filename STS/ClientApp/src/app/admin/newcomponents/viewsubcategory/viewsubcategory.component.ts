  import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { subcategoryDataModel } from '../../../model/model';

@Component({
  selector: 'app-viewsubcategory',
  templateUrl: './viewsubcategory.component.html',
  styleUrls: ['./viewsubcategory.component.css']
})
export class ViewsubcategoryComponent implements OnInit {

  subcategory = new subcategoryDataModel();
  subcategoryDetails: subcategoryDataModel[]=[];
  
  constructor(private router: Router, private commonService: CommonService) { 
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

  deleteSubcategory(sid: number) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.commonService.deleteSubcategory(sid).subscribe(data => {
        this.commonService.viewsubcategoryList();
        this.viewsubcategoryList();
      });
    }
  }

}
