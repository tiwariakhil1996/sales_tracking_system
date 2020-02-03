import { Component, OnInit } from '@angular/core';
import { AddactivityModel, productModel, clientModel } from '../../../model/model';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent implements OnInit {

  Addactivity= new AddactivityModel();
  AddactivityDetails:AddactivityModel[]=[];
  
  product = new productModel();
  productDetails: productModel[] = [];

  client = new clientModel();
  clientDetails: clientModel[] = [];

  constructor(private productService: CommonService) { 
    this.productList();
    this.clientList();
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
  selectDate($scope, $filter){
    $scope.date_Rdv = $filter('date')(Date.now(), 'yyyy-MM-dd');
  }
}
