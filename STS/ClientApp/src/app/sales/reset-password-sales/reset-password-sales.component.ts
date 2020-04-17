import { Component, OnInit } from '@angular/core';
import { registerModel } from '../../model/admin';
import { ResetPasswordAdmin } from '../../model/resetpassword';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from '../../service/resetpassword.service';

@Component({
  selector: 'app-dashboard',
  // selector: 'app-reset-password-sales',
  templateUrl: './reset-password-sales.component.html',
  styleUrls: ['./reset-password-sales.component.css']
})
export class ResetPasswordSalesComponent implements OnInit {

  loginDetail = new registerModel();
  adminDetails: registerModel[] = [];
  Resetpass = new ResetPasswordAdmin();
  Resetpassword = new ResetPasswordAdmin();
  Token: any;
  UserId: any;

  constructor(private router: Router,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private resetpassword: ResetPasswordService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.Token) {
        this.Token = params.Token;
        this.UserId = params.UserId;
        this.Resetpassword.UserId = this.UserId;
      }

    });
  }


  ResetPassword() {

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

    // this.router.navigate(['/admin/forgot-password'], { queryParams: { id: 'ResetPassword_id' } });

    if (this.Resetpassword.Newpassword === this.Resetpassword.Confirmpassword) {

      this.Resetpassword.Newpassword= btoa(this.Resetpassword.Newpassword);
      this.Resetpassword.Confirmpassword = btoa(this.Resetpassword.Confirmpassword);
      
      this.resetpassword.ResetPasswordSales(this.Token, this.Resetpassword).subscribe((data: any) => {
        if (data.Status.code === 0) {
          this.toastr.success('Reset Password successfully', 'Successful', {
            disableTimeOut: false
          });
          this.Resetpassword = new ResetPasswordAdmin();
        }
        else if (data.Status.code === 1) {
          this.toastr.error('New password must be unique, it should not be same as old password', 'Error', {
            disableTimeOut: false,
            timeOut: 2000
          });
        }
        else if (data.Status.code === 2) {
          this.toastr.info('Link has been expired', 'Info', {
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
