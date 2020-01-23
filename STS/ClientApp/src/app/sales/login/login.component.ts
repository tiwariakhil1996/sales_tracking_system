import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from '../../service/sales.service';
import { salesregisterModel } from '../../model/model';




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
  login = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];

  constructor(private router: Router, private salesService: SalesService) {
    // this.registerList();


  }
  ngOnInit() {

  }



  submitForm() {
    this.salesService.SalesLoginService(this.login).subscribe((data: any) => {
      if (data.Status.code === 0) {
        const obj = this.salesDetails.find(item => item.email == this.login.email && item.password == this.login.password);
        if (!obj) {
          // this.toastrService.success('login succesfully', 'success');
          
          alert('Sales Login Successfully');
          this.router.navigate(['/sales/dashboard']);
        }
        else {
          alert('UnSuccessfully');
          // this.toastrService.warning('please enter the valid email or passsword', 'warning');
        }
      }
    }, (err) => {
    });


  }

  registerForm() {
    this.router.navigate(['/register']);
  }

  // registerList(){
  //   this.salesService.SalesRegisterList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.RegisterSalesList) {
  //         this.salesDetails = data.RegisterSalesList;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

}



