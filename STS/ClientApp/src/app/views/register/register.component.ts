import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { signupModel } from '../model/model';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent  implements OnInit{

  title = 'STS';
  register = new signupModel();

  userDetails: signupModel[] = [];
  constructor(private userService: UserService) {
    this.Login();


  }

  ngOnInit() {
  }

  // Login() {
  //   this.userService.SignupList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.RegisterList) {
  //         this.userDetails = data.RegisterList;
  //       }
  //     }
  //   }, (err) => {


  //   });
  // }

  Signup() {

    this.userService.Signup(this.register).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Registered sucesfully');
      }
    }, (err) => {


    });
  } 
}
