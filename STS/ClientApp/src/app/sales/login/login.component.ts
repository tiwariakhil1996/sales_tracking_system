import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from '../../service/sales.service';
import { registerModel } from '../../model/model';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class SalesLoginComponent implements OnInit {

  // formdata;
  // message: string;
  // loginDetail: any = new loginModel();
  // registerDetails: registerModel[] = [];
  // constructor(private router: Router, private toastr: ToastrService) { }

  title = 'STS';
  login = new registerModel();
  salesDetails: registerModel[] = [];

  constructor(private router: Router, private salesService: SalesService) {
    this.registerList();


  }
  ngOnInit() {

  }



  submitForm() {



  }

  registerForm() {
    this.router.navigate(['sales/register']);
  }

  registerList(){
    this.salesService.RegisterList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.RegisterList) {
          this.salesDetails = data.RegisterList;
        }
      }
    }, (err) => {

    });
  }

}



