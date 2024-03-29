import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../../service/sales.service';
import { ToastrService } from 'ngx-toastr';
import { registerModel } from '../../model/admin';
import { salesregisterModel } from '../../model/sales';

@Component({
  selector: 'app-dashboard',
  templateUrl: './sales-register.component.html',
  styleUrls: ['./sales-register.component.css']
})
export class SalesRegisterComponent implements OnInit {

  title = 'STS';
  imageSrc: string = '';

  user = new registerModel();

  register = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];

  RoleJason = {
    ROle: [0, 1],
    Component: 'RegisterComponent'
  };

  constructor(private router: Router, private salesService: SalesService, private toastr: ToastrService) {
    // this.Login();


  }

  ngOnInit() {
    this.checkRole(this.RoleJason);
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
  LoginAdmin() {
    this.router.navigate(['admin/login']);
  }
  LoginSales() {
    this.router.navigate(['sales/login']);
  }
  backtodashboard() {
    this.router.navigate(['admin/dashboard']);
  }


  submitForm() {

    let strError = '';

    if (!this.register.salesName) {
      strError += '- Please enter username';
    } else {
      if (!this.validateName(this.register.salesName)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- First name should be in alphabets';
      }
    }


    if (!this.register.email) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter valid email id';
    } else {
      if (!this.validateEmail(this.register.email)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Email should contain @ and . ';
      }
    }

    if (!this.register.password) {
      strError += '- Please enter valid password';
    } else {
      if (!this.passwordValidation(this.register.password)) {
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

    if (this.register.password === this.register.cpassword) {



      this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
      this.register.createdby = this.user.id;
      console.log(this.register.createdby);

      // Encrypt Password
      this.register.password = btoa(this.register.password);
      this.register.cpassword = btoa(this.register.cpassword);

      this.salesService.SalesRegisterService(this.register).subscribe((data: any) => {
        if (data.Status.code === 0) {
          // alert('Sales Registered sucesfully');
          this.toastr.success('Registration Successful', 'Successful', {
            disableTimeOut: false,
            timeOut: 2000
          });
        } else {
          // alert("Not Matched");
          this.toastr.info('This email id is already registered', 'Info', {
            disableTimeOut: false,
            timeOut: 2000
          });
        }
        this.register = new salesregisterModel();
      }
        , (err) => {


        });
    } else {
      this.toastr.error('Password & Confirm Password didnt match', 'Error', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }
  }


  firstnameValidation() {
    let isValid = false;
    if (!this.validateName(this.register.salesName)) {
      // alert('Please enter valid name.')
      // this.errorMessage="Please enter valid first name";
      isValid = true;
    }


    if (isValid) {
      this.toastr.warning('Please enter username correctly', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }



  validateName(nameField) {
    const reg = /^[A-Za-z\s]+$/;
    return reg.test(nameField) === false ? false : true;
  }

  // Email Validation

  checkEmailValidation() {
    let isValid = false;
    if (!this.validateEmail(this.register.email)) {
      // alert('Please enter valid email.')
      // this.errorMessage="Please enter valid email";
      //  return false;
      isValid = true;
    }

    if (isValid) {
      this.toastr.warning('Please enter valid email id', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }

  validateEmail(emailField) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(emailField) === false ? false : true;
  }


  // Mobile no.  Validation

  mobValidation() {
    let isValid = false;
    if (!this.validateMobile(this.register.mobile)) {

      isValid = true;
    }

    if (isValid) {
      this.toastr.warning('Please enter valid mobile number', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }
  }

  validateMobile(mobileField) {
    const reg = /^\d{10}$/;
    return reg.test(mobileField) === false ? false : true;
  }


  passwordValidation(passwordField) {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return reg.test(passwordField) === false ? false : true;
  }


  adminForm() {
    this.router.navigate(['/register']);
  }

  loginForm() {
    this.router.navigate(['/sales/login']);
  }

  back() {
    this.router.navigate(['/admin/dashboard'])
  }


}
