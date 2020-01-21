import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { registerModel } from '../model/model';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class SalesRegisterComponent  implements OnInit{

  title = 'STS';
  register = new registerModel();

  adminDetails: registerModel[] = [];
  constructor(private router: Router, private adminService: AdminService){
    // this.Login();


  }

  ngOnInit() {
  }


  submitForm() {

    this.adminService.RegisterService(this.register).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Registered sucesfully');
      }
    }, (err) => {


    });
  } 

  adminForm() {
    this.router.navigate(['/register']);
  }

  loginForm(){
    this.router.navigate(['/sales/login']);
  }
}
