import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { registerModel } from '../../model/admin';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit {

  title = 'STS';
  imageSrc: string = '';

  register = new registerModel();
  adminDetails: registerModel[] = [];

  RoleJason = {
    ROle: [0, 1],
    Component: 'RegisterComponent'
  };

  constructor(private router: Router, private adminService: AdminService, private toastr: ToastrService) {


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

  // Login() {
  //   this.userService.RegisterList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.RegisterList) {
  //         this.userDetails = data.RegisterList;
  //       }
  //     }
  //   }, (err) => {


  //   });
  // }

  submitForm() {
    // this.register.image = this.imageSrc;

    let strError = '';

    if (!this.register.username) {
      strError += '- Please enter username';
    } else {
      if (!this.validateName(this.register.username)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- First name should be in alphabets';
      }
    }

    if (!this.register.gender) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select gender';
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

    if (!this.register.mobile) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter valid mobile no.';
    } else {
      if (!this.validateMobile(this.register.mobile)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Mobile no should be of 10 digits';
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

    this.adminService.AdminRegisterService(this.register).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Admin Registered Successfully');
        this.toastr.success('Registration Successful', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
        this.register = new registerModel();
      } else {
        // alert("Not Matched");
        this.toastr.info('This email id is already registered', 'Info', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }


    }, (err) => {


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
    if (!this.validateName(this.register.username)) {
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
    const reg = /^[A-Za-z]+$/;
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


  handleFileInput(fileList: FileList) {
    const preview = document.getElementById('photos-preview');
    Array.from(fileList).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);
        const imageDetail = String(reader.result).split(';base64,');
        this.register.image = imageDetail[1];
        this.register.ImageExtn = '.' + imageDetail[0].replace('data:image/', '');
        image.height = 100;
        image.width = 100;
        preview.appendChild(image);
      };
      reader.readAsDataURL(file);
      console.log(file);

    });
  }

  salesForm() {
    this.router.navigate(['/sales/register']);
  }

  loginForm() {
    this.router.navigate(['/admin/login']);
  }
}
