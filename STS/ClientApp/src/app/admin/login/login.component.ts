import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';
import { registerModel } from '../../model/model';



@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  // formdata;
  // message: string;
  // loginDetail: any = new loginModel();
  // registerDetails: registerModel[] = [];
  // constructor(private router: Router, private toastr: ToastrService) { }

  title = 'STS';
  login = new registerModel();
  adminDetails: registerModel[] = [];

  constructor(private router: Router, private adminService: AdminService) {
    // this.registerList();


  }
  ngOnInit() {

  }

  // loginForm() {
  //   let isValid = false;
  //   this.registerDetails = JSON.parse(localStorage.getItem('Signup')) || [];
  //   this.registerDetails.forEach(element => {
  //     if (this.loginDetail.userName == element.userName && this.loginDetail.password == element.password) {
  //       isValid = true;
  //     }
  //   });

  //   if (isValid) {
  //     this.toastr.success('Login Successful', 'Successful', {
  //       disableTimeOut: false
  //     });
  //     this.router.navigate(['/dashboard']);
  //   } else {
  //     this.toastr.warning('Please enter valid username and password', 'Warning', {
  //       disableTimeOut: false
  //     });
  //   }
  // }

  // submitForm() {

  // }
  //   this.userService.SignupList().subscribe( data => {      
  //       if(data.Status.code===0)    
  //       {       
  //         this.router.navigate(['/dashboard']);  
  //       }    
  //       else{    
  //         this.errorMessage = data.Message;    
  //       }    
  //     },    
  //     error => {    
  //       this.errorMessage = error.message;    
  //     });    
  // };   


  // submitForm() {
  //   this.adminService.AdminLogin(this.login).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       const obj = this.adminDetails.find(item => item.email == this.login.email && item.password == this.login.password);
       
  //       if (!obj) {}
  //         alert('Admin Login Successfully');
  //         this.router.navigate(['/admin/dashboard']);
  //       }
  //       else {
  //         alert('UnSuccessfully');
  //       }
  //     }
  //   }, (err) => {
  //   });
  // }

  submitLogin() {
  this.adminService.AdminLogin(this.login).subscribe((data: any) => {
    if (data.Status.code === 0) {
      localStorage.setItem('loginDetails', JSON.stringify(data));
      alert('Admin Login Successfully');
      this.router.navigate(['/admin/dashboard']);
    }
    else {
      alert('UnSuccessfully');
    }
  }, (err) => {
  });
  }
  

  

  // registerForm() {
  //   this.router.navigate(['/register']);
  // }

  // adminregisterForm(){
  //   this.router.navigate(['/admin/register']);
  // }

  // salesregisterForm(){
  //   this.router.navigate(['/sales/register']);
  // }

  // registerList(){
  //   this.adminService.RegisterList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.RegisterList) {
  //         this.adminDetails = data.RegisterList;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

}



