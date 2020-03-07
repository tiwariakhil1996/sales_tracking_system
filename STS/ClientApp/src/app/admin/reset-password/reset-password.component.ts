import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';
import { registerModel } from '../../model/admin';
import { ResetPasswordService } from '../../service/resetpassword.service';
import { ResetPasswordAdmin } from '../../model/resetpassword';


@Component({
  // selector: 'app-forgot-password',
  selector: 'app-dashboard',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  loginDetail = new registerModel();
  adminDetails: registerModel[] = [];
  Resetpassword= new ResetPasswordAdmin();

  // RoleJason = {
  //   ROle: [0, 1],
  //   Component: 'ForgotPasswordComponent'
  // };

  constructor(private router: Router,
    private adminService: AdminService,
    private toastr: ToastrService,
    private resetpassword:ResetPasswordService
  
    ) {
      this.loginDetail = JSON.parse(localStorage.getItem('adminLogin')) || {};
      this.Resetpassword.ResetPassword_id = this.loginDetail.id;
      // console.log(this.Resetpassword.ResetPassword_id);
      
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


  ResetPassword(ResetPassword_id:number) {
    
    let strError = '';

    if (!this.Resetpassword.Newpassword) {
      strError += '- Please enter valid password';
    } else {
      if (!this.passwordValidation(this.Resetpassword.Newpassword)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Your password must be between 6 and 20 characters _at least one uppercase and one lowercase letter_one number digit_ one special character like $, #, @, !,%,^,&,*,(,)   ';
      }
    }

    if (strError !== '') {
      this.toastr.warning(strError, 'Warning', {
        disableTimeOut: false,
        timeOut: 2000,
        enableHtml: true,
        progressBar: true,
        closeButton: true,
      });
      return false;
    }


    if (this.Resetpassword.Newpassword === this.Resetpassword.Confirmpassword) {

      this.resetpassword.ResetPassword(ResetPassword_id, this.Resetpassword).subscribe((data: any) => {
        if (data.Status.code === 0) {
          this.toastr.success('Reset Password successfully', 'Successful', {
            disableTimeOut: false
          });
          this.Resetpassword = new ResetPasswordAdmin();
        }
      }, (err) => {

      });
    } else {
      this.toastr.error('New Password & Confirm Password didnt match', 'Error', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }
  passwordValidation(passwordField) {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return reg.test(passwordField) === false ? false : true;
  }

  backtologinpage() {
    this.router.navigate(['/admin/login']);
  }

}
