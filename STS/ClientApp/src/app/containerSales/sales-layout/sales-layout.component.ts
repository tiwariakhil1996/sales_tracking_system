import { Component, OnInit, TemplateRef } from '@angular/core';
import { SalesnavItems } from '../../_Salesnav';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SalesService } from '../../service/sales.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from '../../service/activity.service';
import { activityModel } from '../../model/activity';
import { salesregisterModel, ChangePasswordModel } from '../../model/sales';


@Component({
  selector: 'app-dashboard',
  templateUrl: './sales-layout.component.html'
})
export class SalesLayoutComponent {
  public sidebarMinimized = false;
  public SalesnavItems = SalesnavItems;

  imageSrc: string = '';
  modalRef: BsModalRef;

  
  user:salesregisterModel= new salesregisterModel();
  
  activity= new activityModel();
  activityDetails: activityModel[]=[];
  totalActivity: any;
  
  loginDetail = new salesregisterModel();
  // salesDetails: salesregisterModel[] = [];
  salesDetails: salesregisterModel = new salesregisterModel();
  item: any;
  updateProfile: any;
  changePassword=new ChangePasswordModel();

  constructor(private router: Router,
    private salesService: SalesService,
    private modalService: NgbModal,
    private modalServices: BsModalService,
    private toastr: ToastrService,
    private activityService: ActivityService) {

      this.activityList();
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

  ChangePasswords(template1: TemplateRef<any>) {
    this.modalRef = this.modalServices.show(template1);
    // this.salesDetails = JSON.parse(localStorage.getItem('salesLogin')) || {};
    // console.log(this.salesDetails);
    // this.changePassword = this.salesDetails;
  }


  updatesalesProfile() {
    // this.updateProfile.image = this.imageSrc;
    this.salesService.UpdateSalesProfile(this.updateProfile).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert("Profile updated successfully");
        this.toastr.success('Profile updated successfully', 'Successful', {
          disableTimeOut: false
        });
        localStorage.setItem('salesLogin', JSON.stringify(data.loginDetail[0] || {}));
      }
    }, (err) => {
    });
  }

  ChangePassword(id) {
    // this.updateProfile.image = this.imageSrc;

    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.changePassword.id = this.user.id;
    console.log(this.changePassword.id);
  

    this.salesService.ChangePassword(id,this.changePassword).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert("Profile updated successfully");
        this.toastr.success('Change Password successfully', 'Successful', {
          disableTimeOut: false
        });
        // localStorage.setItem('salesLogin', JSON.stringify(data.loginDetail[0] || {}));
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


  activityList() {
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.activity.userid = this.user.id;
    console.log(this.activity.userid);

    this.activityService.each_sales_activityList(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_sales_activityList) {
          this.activityDetails = data.each_sales_activityList;
          console.log(this.activityDetails);
          this.totalActivity = this.activityDetails.length;
          console.log( this.totalActivity );

        }
      }
    }, (err) => {

    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('salesLogin');
  }
}
