import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';
import { registerModel } from '../../model/admin';
import { EmailService } from '../../service/email.service';


@Component({
  // selector: 'app-forgot-password',
  selector: 'app-dashboard',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  loginDetail = new registerModel();
  adminDetails: registerModel[] = [];

  RoleJason = {
    ROle: [0, 1],
    Component: 'ForgotPasswordComponent'
  };

  constructor(private router: Router,
    private adminService: AdminService,
    private toastr: ToastrService,
    private _emailService: EmailService) {

  }

  ngOnInit() {
    // this.checkRole(this.RoleJason);
  }

  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['admin/login']);
      }
    }
  }


  submitLogin() {

  }


  // onSubmit(name, email, message) {
  //   this._emailService.sendEmail({
  //     from: 'Mailgun Sandbox <postmaster@sandboxXXXXXXXXXXXXXXXXXXXXX.mailgun.org>',
  //     to: email,
  //     name: name,
  //     text: message,
  //   })
  //   .subscribe(
  //     () => {},
  //     err => console.log(err)
  //   );
  // } 
}
