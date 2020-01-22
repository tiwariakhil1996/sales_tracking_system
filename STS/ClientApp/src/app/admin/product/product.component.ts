import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ProductModel } from '../../model/model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  

  constructor(
    
    ) { }

  ngOnInit() {
  }

  
}
