import { SendMailModel, sendmailModel } from './../../model/sendmail';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';
import { registerModel } from '../../model/admin';
import { SendEmailService } from '../../service/sendemail.service';



@Component({
  // selector: 'app-forgot-password',
  selector: 'app-dashboard',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  loginDetail = new registerModel();
  adminDetails: registerModel[] = [];

  mailDetail = new sendmailModel();
  mailDetails: sendmailModel[] = [];

  // RoleJason = {
  //   ROle: [0, 1],
  //   Component: 'ForgotPasswordComponent'
  // };

  constructor(private router: Router,
    private adminService: AdminService,
    private toastr: ToastrService,
    private sendmail: SendEmailService
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


  // Sendmail() {
  //   let getemail = new SendMailModel();
  //   getemail.UsernameEmail = this.loginDetail.email;
  //   this.sendmail.sendmail(getemail).subscribe((data: any) => {
  //     this.toastr.success('An Email has been sent to you with instructions to reset your password.', '', {
  //       disableTimeOut: false,
  //       timeOut: 5000
  //     });
  //   });
  // }

  Sendmail() {
    let getemail = new SendMailModel();
    getemail.UsernameEmail = this.loginDetail.email;
    this.sendmail.sendmail(getemail).subscribe((data: any) => {
      if (data.Status.code === 0) {
        this.toastr.success('Email has been sent to you with instructions to reset your password. succesfully', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
      } else {
        this.toastr.error('Soory,we couldnt find an account with that email address please contact your account administrator', 'Error', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
    }, (err) => {

    });
  }



  backtologinpage() {
    this.router.navigate(['/admin/login']);
  }

}
