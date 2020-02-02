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
  loginDetail = new registerModel();
  adminDetails: registerModel[] = [];

  constructor(private router: Router, private adminService: AdminService) {
    // this.registerList();

    this. logout();

  }
  ngOnInit() {

  }

  submitLogin() {
  this.adminService.AdminLogin(this.loginDetail).subscribe((data: any) => {
    if (data.Status.code === 0) {
      localStorage.setItem('adminLogin', JSON.stringify(data.loginDetail[0] || {}));
      alert('Admin Login Successfully');
      this.router.navigate(['/admin/dashboard']);
    }
    else {
      alert('UnSuccessfully');
    }
  }, (err) => {
  });
  }
  
  logout() {
    localStorage.removeItem('adminLogin');
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



