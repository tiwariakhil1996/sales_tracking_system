import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { registerModel, LoginModel } from '../model/model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  // formdata;
  // message: string;
  // loginDetail: any = new loginModel();
  // registerDetails: registerModel[] = [];
  // constructor(private router: Router, private toastr: ToastrService) { }

  title = 'STS';
  login = new registerModel();
  userDetails: registerModel[] = [];

  signin=new LoginModel();
  SignInForm:FormGroup;
  isLoading=false;

  constructor(
    private router: Router,
    private userService: UserService,
    private FormBuilder:FormBuilder     
     ) {

    this.registerList();


  }
  ngOnInit() {
    this.SignInForm=this.FormBuilder.group({
      email:['',[Validators.email,Validators.required]],
      password:['',Validators.required]

    })
  }
  get SignInFormData() {return this.SignInForm.controls;}

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
      if(this.SignInForm.invalid || this.isLoading)
      {
        return ;
      }
      this.isLoading=true;
      //call user service for login
      this.userService.login(this.SignInForm.value).subscribe(x=>{
        this.isLoading=false;
        //Redirect to Home page
        
      });



  }

  registerForm() {
    this.router.navigate(['/register']);
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



