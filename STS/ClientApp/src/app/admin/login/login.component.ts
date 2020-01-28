import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private adminService: AdminService, private Toastr: ToastrService) {
    // this.registerList();


  }
  ngOnInit() {

  }
  // redirect the both register from admin and sales 

  adminregisterForm() {
    this.router.navigate(['admin/register']);
  }
  salesregisterForm() {
    this.router.navigate(['sales/register']);
  }



  submitForm() {
    this.adminService.AdminLogin(this.login).subscribe((data: any) => {
      if (data.Status.code === 0) {

        alert('Admin Login Successfully');

        this.router.navigate(['/admin/dashboard']);
      }
      else {

        alert('Admin Login Failed');

      }
    }, (err) => {

    });
  }


  registerForm() {
    this.router.navigate(['/register']);
  }


}



