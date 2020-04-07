import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';
import { registerModel } from '../../model/admin';



@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'STS';
  loginDetail = new registerModel();
  adminDetails: registerModel[] = [];

  constructor(private router: Router, private adminService: AdminService, private toastr: ToastrService) {
    // this.registerList();

    this.logout();

  }
  ngOnInit() {

  }


  submitLogin() {


    this.adminService.AdminLogin(this.loginDetail).subscribe((data: any) => {
      if (data.Status.code === 0) {
        localStorage.setItem('adminLogin', JSON.stringify(data.loginDetail[0] || {}));
        this.toastr.success('Login Successful', 'Successful', {
          disableTimeOut: false
        });

        this.router.navigate(['/admin/dashboard']);
      } else {
        // alert('UnSuccessfully');
        this.toastr.warning('Please enter valid username and password', 'Warning', {
          disableTimeOut: false
        });
      }
    }, (err) => {
    });
  }

  logout() {
    // remove user from local storage to log user out
    this.loginDetail = JSON.parse(localStorage.getItem('adminLogin')) || {};
    let id = this.loginDetail.id;

    this.adminService.AdminLogoutService(id).subscribe((data: any) => {
      if (data.Status.code === 0) {
        this.toastr.success('Logged out Successfully', 'Successful', {
          disableTimeOut: false
        });

        localStorage.removeItem('adminLogin');
      }
    }
    );


  }

  forgotPassword() {
    this.router.navigate(['/admin/forgot-password']);
  }


}



