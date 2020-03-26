import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { SendEmailService } from '../../service/sendemail.service';
import { SendMailModel, sendmailModel } from '../../model/sendmail';
import { registerModel } from '../../model/admin';

@Component({
  // selector: 'app-forgot-password-sales',
  selector: 'app-dashboard',
  templateUrl: './forgot-password-sales.component.html',
  styleUrls: ['./forgot-password-sales.component.css']
})
export class ForgotPasswordSalesComponent implements OnInit {

  loginDetail = new registerModel();
  adminDetails: registerModel[] = [];

  mailDetail = new sendmailModel();
  mailDetails: sendmailModel[] = [];

  constructor(private router: Router,
    private adminService: AdminService,
    private toastr: ToastrService,
    private sendmail: SendEmailService
  ) {
  }

  ngOnInit() {
  }

  Sendmail() {

    let getemail = new SendMailModel();
    getemail.UsernameEmail = this.loginDetail.email;
    this.sendmail.send_sales_mail(getemail).subscribe((data: any) => {
      if (data.Status.code === 0) {

        this.toastr.success('Password reset request link has been sent to your email', '', {
          disableTimeOut: false,
          timeOut: 5000
        });

      } else {
        this.toastr.warning('This email id is not registered', 'Warning', {
          disableTimeOut: false
        });
      }
    }, (err) => {

    });
  }

  backtologinpage() {
    this.router.navigate(['/sales/login']);
  }


}
