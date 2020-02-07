import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from '../../service/sales.service';
import { salesregisterModel } from '../../model/sales';

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
  loginDetail = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];

  constructor(private router: Router, private salesService: SalesService,private toastr: ToastrService) {
    // this.registerList();
     this.logout();

  }
  ngOnInit() {

  }



  // submitForm() {
  //   this.salesService.SalesLoginService(this.login).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       const obj = this.salesDetails.find(item => item.email == this.login.email && item.password == this.login.password);
  //       if (!obj) {
  //         // this.toastrService.success('login succesfully', 'success');
          
  //         alert('Sales Login Successfully');
  //         this.router.navigate(['/sales/dashboard']);
  //       }
  //       else {
  //         alert('UnSuccessfully');
  //         // this.toastrService.warning('please enter the valid email or passsword', 'warning');
  //       }
  //     }
  //   }, (err) => {
  //   });
  // }


  submitLogin() {
    this.salesService.SalesLoginService(this.loginDetail).subscribe((data: any) => {
      if (data.Status.code === 0) {
        localStorage.setItem('salesLogin', JSON.stringify(data.loginDetail[0] || {}));
        // alert('Sales Login Successfully');
        this.toastr.success('Login Successful', 'Successful', {
          disableTimeOut: false
        });

        this.router.navigate(['/sales/dashboard']);
      }
      else {
        // alert('UnSuccessfully');

        this.toastr.warning('Please enter valid username and password', 'Warning', {
          disableTimeOut: false
        });
      }
    }, (err) => {
    });
    }

    logout() {
      localStorage.removeItem('salesLogin');
    }
  
    
  registerForm() {
    this.router.navigate(['/sales/register']);
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



