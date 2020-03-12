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


  Sendmail() {
    
    let getemail = new SendMailModel();
    getemail.UsernameEmail = this.loginDetail.email;
    this.sendmail.sendmail(getemail).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // if (data.sendmail) {
        //   this.mailDetails = data.sendmail;
        //   console.log(this.mailDetails);

        // }
      this.toastr.success('Password reset request link has been sent to your email', '', {
        disableTimeOut: false,
        timeOut: 5000
      });

    } else {
      this.toastr.warning('This email id is not registered', 'Warning', {
        disableTimeOut: false
      });
    }
  },(err) => {

  } );
  }

  backtologinpage() {
    this.router.navigate(['/admin/login']);
  }

}
