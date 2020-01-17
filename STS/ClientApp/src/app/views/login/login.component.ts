import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginModel, registerModel } from '../model/register-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  formdata;
  message: string;
  loginDetail: any = new loginModel();
  registerDetails: registerModel[] = [];


  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

  }

  loginForm() {
    let isValid = false;
    this.registerDetails = JSON.parse(localStorage.getItem('Signup')) || [];
    this.registerDetails.forEach(element => {
      if (this.loginDetail.userName == element.userName && this.loginDetail.password == element.password) {
        isValid = true;
      } 
    });

    if (isValid) {
      this.toastr.success('Login Successful', 'Successful', {
        disableTimeOut: false
      });
      this.router.navigate(['/dashboard']);
    } else {
      this.toastr.warning('Please enter valid username and password', 'Warning', {
        disableTimeOut: false
      });
    }
  }
}



