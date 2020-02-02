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
    this.register.image = this.imageSrc;
    this.adminService.AdminRegisterService(this.register).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Admin Registered Successfully');
      }
      this.register = new registerModel();
    }, (err) => {


    });
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
