import { Component, OnInit, TemplateRef } from '@angular/core';
import { SalesnavItems } from '../../_Salesnav';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SalesService } from '../../service/sales.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { salesregisterModel } from '../../model/sales';


@Component({
  selector: 'app-dashboard',
  templateUrl: './sales-layout.component.html'
})
export class SalesLayoutComponent {
  public sidebarMinimized = false;
  public SalesnavItems = SalesnavItems;

  imageSrc: string = '';
  modalRef: BsModalRef;
  
  loginDetail = new salesregisterModel();
  // salesDetails: salesregisterModel[] = [];
  salesDetails: salesregisterModel = new salesregisterModel();
  item: any;
  updateProfile: any;
  
  constructor(private router: Router,
    private salesService: SalesService,
    private modalService: NgbModal,
    private modalServices: BsModalService) 
    { 
    
    }
  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalServices.show(template);
    this.salesDetails = JSON.parse(localStorage.getItem('salesLogin')) || {};
    console.log(this.salesDetails);
    this.updateProfile = this.salesDetails;
  }


  updatesalesProfile(){
    // this.updateProfile.image = this.imageSrc;
    this.salesService.UpdateSalesProfile(this.updateProfile).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert("Profile updated successfully");
        localStorage.setItem('salesLogin', JSON.stringify(data.loginDetail[0] || {}));
      }
    }, (err) => {
    });
  }

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
    //   // console.log(this.imageSrc);
    // }


    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('salesLogin');
  }
}