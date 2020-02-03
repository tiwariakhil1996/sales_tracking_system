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
  imageSrc: string = '';

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
    this.register.image = this.imageSrc;
    this.salesService.SalesRegisterService(this.register).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Sales Registered sucesfully');
      }
      this.register = new salesregisterModel();
    } 
    , (err) => {


    });
  } 

     // Image to Base64

     handleInputChange(e) {
      var file = e.target.files[0];
      var pattern = /image-*/;
      var reader = new FileReader();
  
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
  
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file)
    }
  
    _handleReaderLoaded(e) {
      const reader = e.target;
      //  console.log(this.imageSrc);
      this.imageSrc = reader.result;
      console.log(this.imageSrc);
    }

  adminForm() {
    this.router.navigate(['/register']);
  }

  loginForm(){
    this.router.navigate(['/sales/login']);
  }
}
