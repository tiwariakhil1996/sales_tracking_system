import { Component, OnInit, TemplateRef } from '@angular/core';
import { SalesnavItems } from '../../_Salesnav';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SalesService } from '../../service/sales.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { salesregisterModel, changePasswordModel, sales_avatarModel } from '../../model/sales';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from '../../service/activity.service';
import { activityModel, newactivityModel } from '../../model/activity';
import { avatarModel, registerModel } from '../../model/admin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './sales-layout.component.html',
  styleUrls: ['./sales-layout.component.css']
})
export class SalesLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public SalesnavItems = SalesnavItems;

  imageSrc: string = '';
  modalRef: BsModalRef;

  newactivity = new newactivityModel();
  newactivityDetails: newactivityModel[] = [];

  assignedActivity: any;

  user = new salesregisterModel();

  profile_pic = new registerModel();
  
  salesavatar = new sales_avatarModel();
  
  username:string;

  activity = new activityModel();
  activityDetails: activityModel[] = [];

  totalActivity: any;

  loginDetail = new salesregisterModel();

  salesDetails: salesregisterModel = new salesregisterModel();

  changePassword = new changePasswordModel();

  item: any;
  updateProfile: any;


  RoleJason = {
    ROle: [0, 1],
    Component: 'SalesLayoutComponent'
  };

  constructor(private router: Router,
    private salesService: SalesService,
    private modalService: NgbModal,
    private modalServices: BsModalService,
    private toastr: ToastrService,
    private activityService: ActivityService) {

    // this.activityList();
    this.newactivityList();

    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.changePassword.id = this.user.id;
    // console.log(this.changePassword.id);
    this.profile_pic.image = this.user.image;
    this.username=this.user.salesName;
  }

  ngOnInit() {
    this.checkRole(this.RoleJason);

    this.getuserProfile();
  }


  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('salesLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      // console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['sales/login']);
      }
    }
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalServices.show(template);
    this.salesDetails = JSON.parse(localStorage.getItem('salesLogin')) || {};
    // console.log(this.salesDetails);
    this.updateProfile = this.salesDetails;
    console.log(this.updateProfile);
    
  }

  changePasswordModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalServices.show(template1);
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



  changepassword(id: number) {

    let strError = '';

    if (!this.changePassword.newpassword) {
      strError += '- Please enter valid password';
    } else {
      if (!this.passwordValidation(this.changePassword.newpassword)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Your password must be between 6 and 20 characters _at least one uppercase and one lowercase letter_one number digit_ one special character like $, #, @, !,%,^,&,*,(,)   ';
      }
    }

    if (strError !== '') {
      this.toastr.warning(strError, 'Warning', {
        disableTimeOut: false,
        timeOut: 2000,
        enableHtml: true,
        progressBar: true,
        closeButton: true,
      });
      return false;
    }

    if (this.changePassword.newpassword === this.changePassword.confirmpassword) {

      this.salesService.changePassword(id, this.changePassword).subscribe((data: any) => {
        if (data.Status.code === 0) {
          this.toastr.success('Password changed successfully', 'Successful', {
            disableTimeOut: false
          });
          this.changePassword = new changePasswordModel();

        } else {
          this.toastr.warning('Old Password is incorrect', 'Warning', {
            disableTimeOut: false,
            timeOut: 2000
          });
        }
      }, (err) => {

      });
    } else {
      this.toastr.error('New Password & Confirm Password didnt match', 'Error', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }



  passwordValidation(passwordField) {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return reg.test(passwordField) === false ? false : true;
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
      // console.log(file);

    });
  }


  // activityList() {
  //   this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
  //   this.activity.userid = this.user.id;
  //   // console.log(this.activity.userid);

  //   this.activityService.each_sales_activityList(this.activity).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.each_sales_activityList) {
  //         this.activityDetails = data.each_sales_activityList;
  //         // console.log(this.activityDetails);
  //         this.totalActivity = this.activityDetails.length;
  //         // console.log(this.totalActivity);

  //       }
  //     }
  //   }, (err) => {

  //   });
  // }


  newactivityList() {
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.activity.userid = this.user.id;
    // console.log(this.activity.userid);

    this.activityService.assigned_activityList(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.assigned_activityList) {
          this.newactivityDetails = data.assigned_activityList;
          // console.log(this.newactivityDetails);
          this.assignedActivity = this.newactivityDetails.length;
          // console.log(this.assignedActivity);

        }
      }
    }, (err) => {

    });
  }

  getuserProfile() {
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.salesavatar.image = this.user.image;

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('salesLogin');
  }
}
