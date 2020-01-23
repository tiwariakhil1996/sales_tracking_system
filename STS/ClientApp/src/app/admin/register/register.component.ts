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
  register = new registerModel();

  adminDetails: registerModel[] = [];
  constructor(private router: Router, private adminService: AdminService){
    // this.Login();


  }

  ngOnInit() {
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

    this.adminService.AdminRegisterService(this.register).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Admin Registered Successfully');
      }
      this.register = new registerModel();
    }, (err) => {


    });
  } 

  salesForm() {
    this.router.navigate(['/sales/register']);
  }

  loginForm(){
    this.router.navigate(['/admin/login']);
  }
}
