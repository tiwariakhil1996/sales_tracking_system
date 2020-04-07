import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { SalesnavItems } from '../../_Salesnav';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SalesService } from '../../service/sales.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { salesregisterModel, changePasswordModel, sales_avatarModel } from '../../model/sales';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from '../../service/activity.service';
import { activityModel, newactivityModel } from '../../model/activity';
import { avatarModel, registerModel, statusModel } from '../../model/admin';
import { AgmMap } from '@agm/core';
import { UpdateImageListModel } from '../../model/product';
import { ChatService } from '../../service/chat.service';
import { chatModel, userModel } from '../../model/chat';

@Component({
  selector: 'app-dashboard',
  templateUrl: './sales-layout.component.html',
  styleUrls: ['./sales-layout.component.css']
})
export class SalesLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public SalesnavItems = SalesnavItems;

  // tempImageList: UpdateImageListModel[] = [];


 
  newactivity = new newactivityModel();
  newactivityDetails: newactivityModel[] = [];

  assignedActivity: any;
  new_message: any;
  isonline:boolean;
  
  user = new salesregisterModel();

  userchat = new userModel();
  userchatDetails: userModel[] = [];

  chat = new chatModel();
  chatDetails: chatModel[] = [];

  profile_pic = new registerModel();

  status = new statusModel();


  salesavatar = new sales_avatarModel();

  pro = new UpdateImageListModel();

  tempImageList: UpdateImageListModel[] = [];

 

  activity = new activityModel();
  activityDetails: activityModel[] = [];

  loginDetail = new salesregisterModel();

  salesDetails: salesregisterModel = new salesregisterModel();

  changePassword = new changePasswordModel();

  item: any;
  // updateProfile =  new profileModel();
  updateProfile: any;

  imageSrc: string = '';
  modalRef: BsModalRef;
  username: string;
  totalActivity: any;

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

  private geoCoder;


  location: Coordinates;
  lat: any;
  lng: any;

  centerlat: any;
  centerlng: any;
  geocoder: any;
  @ViewChild(AgmMap) map: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  RoleJason = {
    ROle: [0, 1],
    Component: 'SalesLayoutComponent'
  };

  isShow = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  constructor(private router: Router,
    private salesService: SalesService,
    private chatService: ChatService,
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
    this.username = this.user.salesName;
  }

  ngOnInit() {
    this.checkRole(this.RoleJason);

    this.getuserProfile();
    this.view_msg();
    this.get_admin_IsOnline();
  }


  Location() {

    // setTimeout(() => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);

      this.location = position.coords;
      this.centerlat = this.location.latitude;
      this.centerlng = this.location.longitude;
      this.lat = this.location.latitude;
      this.lng = this.location.longitude;
      this.geocoder = new google.maps.Geocoder();


    });
    // }, 2000);
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

    // console.log(this.updateProfile);

  }

  changePasswordModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalServices.show(template1);
  }

  updatesalesProfile() {
    // let strError = '';

    //  if (!this.updateProfile.image) {
    //   strError += strError = '' ? '' : '<br/>';
    //   strError += '- Please select image';
    // }

    if (this.updateProfile.image === null) {
      this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
      this.updateProfile.image = this.user.image;
    }

    //  if (strError !== '') {
    //   this.toastr.warning(strError, 'Warning', {
    //     disableTimeOut: false,
    //     timeOut: 2000,
    //     enableHtml: true,
    //     progressBar: true,
    //     closeButton: true,
    //   });
    //   return false;
    // }

    // this.updateProfile.image = this.imageSrc;
    this.salesService.UpdateSalesProfile(this.updateProfile).subscribe((data: any) => {
      if (data.Status.code === 0) {
        this.toastr.success('Profile updated successfully', 'Successful', {
          disableTimeOut: false
        });
        localStorage.setItem('salesLogin', JSON.stringify(data.loginDetail[0] || {}));
        this.getuserProfile();
        this.modalRef.hide();
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

  delete_profile_pic(id: number) {
    this.updateProfile.image = null;
    this.profile_pic.image = null;
    this.pro.ImageData = null;
    this.salesavatar.image = null;

    this.salesService.delete_profile_pic(id).subscribe((data: any) => {
      if (data.Status.code === 0) {
        localStorage.setItem('salesLogin', JSON.stringify(data.loginDetail[0] || {}));

        this.toastr.success('Profile pic deleted Successful', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
    }, (err) => {
    });

    // this.salesService.delete_profile_pic(id).subscribe(data => {

    // });

    // this.toastr.success('Profile pic deleted Successful', 'Successful', {
    //   disableTimeOut: false,
    //   timeOut: 2000
    // });

  }


  handleFileInput(fileList: FileList) {
    const preview = document.getElementById('photos-preview');
    Array.from(fileList).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);
        const imageDetail = String(reader.result).split(';base64,');

        this.pro.ImageData = String(reader.result);

        this.updateProfile.image = imageDetail[1];
        this.updateProfile.ImageExtn = '.' + imageDetail[0].replace('data:image/', '');
        image.height = 100;
        image.width = 100;
        preview.appendChild(image);
        console.log(this.updateProfile.image);

      };
      reader.readAsDataURL(file);
      // console.log(file);

    });
  }

  // handleFileInput(fileList: FileList) {
  //   this.imageList = [];
  //   this.imageModel = [];
  //   // const preview = document.getElementById('photos-preview');
  //   Array.from(fileList).forEach((file: File) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       // const image = new Image();
  //       // image.src = String(reader.result);
  //       const imageDetail = String(reader.result).split(';base64,');
  //       // this.product.imageList = imageDetail[1];
  //       // this.image.ImageExtn = '.' + imageDetail[0].replace('data:image/', '');
  //       // image.height = 100;
  //       // image.width = 100;
  //       // preview.appendChild(image);
  //       this.tempImageList.push({ ImageId: 0, ImageData: String(reader.result) });
  //       this.imageList.push({ ImageExtn: '.' + imageDetail[0].replace('data:image/', ''), Image: '', ImageData: imageDetail[1] });
  //       this.imageModel.push({ Image: '' });

  //     };
  //     reader.readAsDataURL(file);
  //     console.log(file);
  //   });
  // }

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

  send_msg() {
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.chat.salesId = this.user.id;
    this.chat.adminId = this.user.createdby;
    this.chat.createdby = this.user.id
      ;

    if (this.chat.msg.length > 0) {
      this.chatService.send_msg(this.chat).subscribe((data: any) => {
        if (data.Status.code === 0) {
          // if (data.getsaleschats) {
          //   this.chatDetails = data.getsaleschats;

          // }
        }

      }, (err) => {


      });
    }

    this.view_msg()
  }

  view_msg() {
    this.userchat = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.chat.salesId = this.userchat.id;
    this.chat.adminId = this.userchat.createdby;
    // this.isonline= this.userchat.isonline;

    this.chatService.get_sales_chats(this.chat).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.getsaleschats) {
          this.chatDetails = data.getsaleschats;
          this.new_message = this.chatDetails.length;
          console.log(this.new_message);
        
        }
   }
    }, (err) => {

    });

  }

  getuserProfile() {
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.salesavatar.image = this.user.image;

    // To display image in update profile modal
    this.profile_pic.image = this.user.image;
  }

  get_admin_IsOnline(){
    this.userchat = JSON.parse(localStorage.getItem('salesLogin')) || {};
    // this.chat.salesId = this.userchat.id;
    this.chat.adminId = this.userchat.createdby;

    this.chatService.get_admin_status(this.chat).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.getadminstatus) {
          this.status = data.getadminstatus;
           console.log( this.status);
           
        }
   }
    }, (err) => {

    });

  }

  logout() {
    // remove user from local storage to log user out
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    let id = this.user.id;

    this.salesService.SalesLogoutService(id).subscribe((data: any) => {
      if (data.Status.code === 0) {
        this.toastr.success('Logged out Successfully', 'Successful', {
          disableTimeOut: false
        });

        localStorage.removeItem('salesLogin');
      }
    }
    );


  }
}
