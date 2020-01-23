import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { salesregisterModel } from '../../model/model';
import { SalesService } from '../../service/sales.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class SalesRegisterComponent  implements OnInit{

  title = 'STS';
  register = new salesregisterModel();

  salesDetails: salesregisterModel[] = [];
  constructor(private router: Router, private salesService: SalesService){
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

    this.salesService.SalesRegisterService(this.register).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Sales Registered sucesfully');
      }
      this.register = new salesregisterModel();
    } 
    , (err) => {


    });
  } 

  adminForm() {
    this.router.navigate(['/register']);
  }

  loginForm(){
    this.router.navigate(['/sales/login']);
  }
}
