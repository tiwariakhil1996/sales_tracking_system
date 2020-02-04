import { Component, OnInit } from '@angular/core';
import { activityModel } from '../../../model/model';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-currentactivity',
  templateUrl: './currentactivity.component.html',
  styleUrls: ['./currentactivity.component.css']
})
export class CurrentactivityComponent implements OnInit {
  
  activity = new activityModel();
  activityDetails: activityModel[]=[];

  constructor(private activityService:CommonService) { 
    this.activityList();
  }

  
  ngOnInit() {
  }
  openBackDropCustomClass(){

  }
  


// Delete

// onDelete(id: number) {
//   if (confirm('Are you sure to delete this record ?') === true) {
//     this.productService.deleteProduct(id).subscribe(data => {
//       this.productService.productList();
//       this.productList();
//     });
//   }
// }

activityList() {
  this.activityService.activityList().subscribe((data: any) => {
    if (data.Status.code === 0) {
      if (data.ActivityList) {
        this.activityDetails = data.ActivityList;
      }
    }
  }, (err) => {

  });
}

}
