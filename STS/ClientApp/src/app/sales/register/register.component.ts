import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { registerModel } from '../model/model';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class SalesRegisterComponent  implements OnInit{

  title = 'STS';
  register = new registerModel();

  userDetails: registerModel[] = [];
  constructor(private router: Router, private userService: UserService){
    // this.Login();


  }

  ngOnInit() {
  }
  LoginAdmin(){
    this.router.navigate(['admin/login']);
  }
  LoginSales(){
    this.router.navigate(['sales/login']);
  }


  submitForm() {

    this.userService.RegisterService(this.register).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Registered sucesfully');
      }
    }, (err) => {


    });
  } 

  
}
