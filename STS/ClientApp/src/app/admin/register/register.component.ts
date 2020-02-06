import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { registerModel } from '../../model/model';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent  implements OnInit{

  title = 'STS';
  imageSrc: string = '';
  errorMessage = '';

  register = new registerModel();
  adminDetails: registerModel[] = [];
  constructor(private router: Router, private adminService: AdminService,private Toastr:ToastrService){
    // this.Login();


  }

  ngOnInit() {
  }
  //Redirect the both login page admin and sales...
  LoginAdmin(){
    this.router.navigate(['admin/login']);
  }
  LoginSales(){
    this.router.navigate(['sales/login']);
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
    let strError = '';
    

    //username
    if (!this.register.username) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter valid username';
    }
    else {
      if (!this.validateusername(this.register.username)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Username should contain @ and . ';
      }
    }

    //email
    if (!this.register.email) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter valid email id';
    }
    else {
      if (!this.validateemail(this.register.email)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Email should contain @ and . ';
      }
    }


    if (!this.register.gender) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select gender';
    }

    if (!this.register.mobile) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter valid mobile number.';
    }
    else {
      if (!this.validatemobile(this.register.mobile)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Mobile no should be of 10 digits';
      }
    }
    // Password validation

    if (!this.register.password) {
      strError += '- Please enter valid password';
    }
    else {
      
      //console.log(this.passwordvalidation(this.registerDetail.password));
      
      if (!this.passwordvalidation(this.register.password)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Your password must be between 6 and 20 characters at least one uppercase and one lowercase letter_one number digit one special character like $, #, @, !,%,^,&,*,(,)';
      }
      
    }

    if (strError !== '') {
      this.Toastr.warning(strError, 'Warning', {
        disableTimeOut: false,
        timeOut: 5000,
        enableHtml: true,
        progressBar: true,
        closeButton: true,
      });
      return false;
    }

   
    if (this.register.password == this.register.cpassword) {
        this.adminService.AdminRegisterService(this.register).subscribe((data: any) => {
      if (data.Status.code === 0) {
        //  alert('Admin Registered Successfully');
         this.Toastr.success('Admin Registration Successful', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
        this.register = new registerModel();        
      }else{
        this.Toastr.info('This email id already register!', 'info', {
          disableTimeOut: false,
          timeOut:3000
  
        });
       }

    }, (err) => {

    });
  }
  else{
    this.Toastr.error('Password and ConfirmPassword didnt match', 'error', {
      disableTimeOut: false,
      timeOut:3000

    });
   }
  
}

//Username validation
usernameValidation() {
  let isValid = false;
  if (!this.validateusername(this.register.username)) {
    isValid = true;
  }
  if (isValid) {
    this.Toastr.warning('Please enter the correct username', 'Warning', {
      disableTimeOut: false,
      timeOut: 2000
    });
  }
}
validateusername(emailField) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(emailField) == false ? false : true;
}

// Email validation 
checkEmailValidation() {
  let isValid = false;
  if (!this.validateemail(this.register.email)) {
    isValid = true;
  }
  if (isValid) {
    this.Toastr.warning('Please enter the valid email id', 'Warning', {
      disableTimeOut: false,
      timeOut: 2000
    });
  }
}
validateemail(emailField) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(emailField) == false ? false : true;
}

//mobile validation 
mobilevalidation() {
  let isValid = false;
  if (!this.validatemobile(this.register.mobile)) {
    // alert('Please enter valid mobile no..')
    isValid = true;
  }
  if (isValid) {
    this.Toastr.warning('Please enter the mobile number correctly', 'Warning', {
      disableTimeOut: false,
      timeOut: 2000
    });
  }
}
validatemobile(mobileField) {
  var reg = /^\d{10}$/;
  return reg.test(mobileField) == false ? false : true;
}

// Password Validation

passwordvalidation(passwordField) {
  var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return reg.test(passwordField);
}

   // Image to Base64

  //  handleInputChange(e) {
  //   var file = e.target.files[0];
  //   var pattern = /image-*/;
  //   var reader = new FileReader();

  //   if (!file.type.match(pattern)) {
  //     alert('invalid format');
  //     return;
  //   }

  //   reader.onload = this._handleReaderLoaded.bind(this);
  //   reader.readAsDataURL(file)
  // }

  // _handleReaderLoaded(e) {
  //   const reader = e.target;
  //   //  console.log(this.imageSrc);
  //   this.imageSrc = reader.result;
  //   // console.log(this.imageSrc);
  // }

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

  loginForm(){
    this.router.navigate(['/admin/login']);
  }

}
