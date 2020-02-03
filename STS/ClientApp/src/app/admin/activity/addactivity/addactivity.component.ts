import { SalesService } from './../../../service/sales.service';
import { Component, OnInit } from '@angular/core';
import { activityModel } from '../../../model/model';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent implements OnInit {

  activity = new activityModel()
  activityDetails: activityModel[]=[];

  constructor() { }

  constructor(private productService: CommonService,private salesService:SalesService) { 
    this.productList();
    this.clientList();
    this.salesList();
  }

  ngOnInit() {
    
  }

  productList() {
    this.productService.productList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ProductList) {
          this.productDetails = data.ProductList;
        }
      }
    }, (err) => {

    });
  }
 clientList() {
    this.productService.clientList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ClientList) {
          this.clientDetails = data.ClientList;
        }
      }
    }, (err) => { console.log(err); });
  }

  changeCategory(){
    
  }
}
