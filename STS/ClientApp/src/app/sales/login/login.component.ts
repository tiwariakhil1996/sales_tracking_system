import { registerModel } from './../model/model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class SalesLoginComponent implements OnInit {

  // formdata;
  // message: string;
  // loginDetail: any = new loginModel();
  // registerDetails: registerModel[] = [];
  // constructor(private router: Router, private toastr: ToastrService) { }

  title = 'STS';
  login = new registerModel();
  userDetails: registerModel[] = [];

  constructor(
    private router: Router, 
    private userService: UserService,
     
    ) {
    this.registerList();


  }
  ngOnInit() {

  }

  // loginForm() {
  //   let isValid = false;
  //   this.registerDetails = JSON.parse(localStorage.getItem('Signup')) || [];
  //   this.registerDetails.forEach(element => {
  //     if (this.loginDetail.userName == element.userName && this.loginDetail.password == element.password) {
  //       isValid = true;
  //     }
  //   });

  //   if (isValid) {
  //     this.toastr.success('Login Successful', 'Successful', {
  //       disableTimeOut: false
  //     });
  //     this.router.navigate(['/dashboard']);
  //   } else {
  //     this.toastr.warning('Please enter valid username and password', 'Warning', {
  //       disableTimeOut: false
  //     });
  //   }
  // }

  submitForm() {

 
  //   this.userService.SignupList().subscribe( data => {      
  //       if(data.Status.code===0)    
  //       {       
  //         this.router.navigate(['/dashboard']);  
  //       }    
  //       else{    
  //         this.errorMessage = data.Message;    
  //       }    
  //     },    
  //     error => {    
  //       this.errorMessage = error.message;    
  //     });    
  // };   


  }

  registerForm() {
    this.router.navigate(['sales/register']);
  }

  registerList(){
    this.userService.RegisterList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.RegisterList) {
          this.userDetails = data.RegisterList;
        }
      }
    }, (err) => {

    });
  }

}



