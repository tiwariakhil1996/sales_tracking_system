import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';


@Component({
  // selector: 'app-forgot-password',
  selector: 'app-dashboard',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {

  // loginDetail = new registerModel();
  // adminDetails: registerModel[] = [];

  // RoleJason = {
  //   ROle: [0, 1],
  //   Component: 'ForgotPasswordComponent'
  // };

  constructor(private router: Router,
    private adminService: AdminService,
    private toastr: ToastrService
    ) {

  }

  ngOnInit() {
    // this.checkRole(this.RoleJason);
  }

  // checkRole(RoleJason) {
  //   const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
  //   if (this.RoleJason.Component === RoleJason.Component) {
  //     console.log(result);
  //     if (!this.RoleJason.ROle.includes(result.userType)) {
  //       this.router.navigate(['admin/login']);
  //     }
  //   }
  // }


  // ResetPassword() {
  //    this.toastr.success('Reset Password Successfully:','Success',{
  //      disableTimeOut:false,
  //      timeOut:5000
  //      });

  // }

  resetpassword() {
    this.router.navigate(['admin/reset-password']);
  }
}
