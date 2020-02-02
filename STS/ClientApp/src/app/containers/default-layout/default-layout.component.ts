import { Component, TemplateRef } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { registerModel, clientModel, productModel } from '../../model/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../service/admin.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  imageSrc: string = '';
  modalRef: BsModalRef;

  register = new registerModel();
  adminDetails: registerModel = new registerModel();
  item: any;
  updateProfile: any;

  product = new productModel();
  productDetails: productModel[] = [];

  constructor(private router: Router,
    private adminService: AdminService,
    private modalService: NgbModal,
    private productService: CommonService,
    private modalServices: BsModalService) {

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }


 

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalServices.show(template);
    this.adminDetails = JSON.parse(localStorage.getItem('adminLogin')) || {};
    console.log(this.adminDetails);
    this.updateProfile = this.adminDetails;
  }

  updateadminProfile() {
    // this.updateProfile.image = this.imageSrc;
    this.adminService.UpdateAdminProfile(this.updateProfile).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert("Profile updated successfully");
        localStorage.setItem('adminLogin', JSON.stringify(data.loginDetail[0] || {}));
      }
    }, (err) => {
    });
  }



  
  // Image to Base64

  // handleInputChange(e) {
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
  //   console.log(this.imageSrc);
  // }

  handleFileInput(fileList: FileList) {
    const preview = document.getElementById('photos-preview');
    Array.from(fileList).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);
        const imageDetail = String(reader.result).split(';base64,');
        this.updateProfile.image = imageDetail[1];
        this.updateProfile.ImageExtn = '.' + imageDetail[0].replace('data:image/', '');
        image.height = 100;
        image.width = 100;
        preview.appendChild(image);
      };
      reader.readAsDataURL(file);
      console.log(file);

    });
  }


  adminregisterForm() {
    this.router.navigate(['/admin/register']);
  }

  salesregisterForm() {
    this.router.navigate(['/sales/register']);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('adminLogin');
  }

}
