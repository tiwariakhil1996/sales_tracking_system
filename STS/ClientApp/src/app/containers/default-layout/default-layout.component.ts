import { Component, TemplateRef, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../service/admin.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from '../../service/sales.service';
import { ProductService } from '../../service/product.service';
import { registerModel, changePasswordModel, avatarModel, userModel } from '../../model/admin';
import { salesregisterModel } from '../../model/sales';
import { productModel, UpdateImageListModel } from '../../model/product';
import { ChatComponent } from '../../admin/chat/chat.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

  // imageSrc: string = '';
  modalRef: BsModalRef;

  register = new registerModel();
  adminDetails: registerModel = new registerModel();

  profile_pic = new registerModel();

  username: string;

  pro = new UpdateImageListModel();
  tempImage: UpdateImageListModel[] = [];

  salesregister = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];

  avatar = new avatarModel();
  tempImageList: avatarModel[] = [];

  changePassword = new changePasswordModel();
  user: number;


  item: any;
  updateProfile: any;

  product = new productModel();
  productDetails: productModel[] = [];

  RoleJason = {
    ROle: [0, 1],
    Component: 'DefaultLayoutComponent'
  };

  constructor(private router: Router,
    private adminService: AdminService,
    // private chatComponent: ChatComponent,
    private modalService: NgbModal,
    private productService: ProductService,
    private modalServices: BsModalService,
    private toastr: ToastrService,
    private salesService: SalesService) {

    this.register = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.changePassword.id = this.register.id;
    this.user = this.register.createdby;
    this.profile_pic.image = this.register.image;
    this.username = this.register.username;
  }

  ngOnInit() {
    // this.chatComponent.view_msg(i);
    this.checkRole(this.RoleJason);

    this.getuserProfile();

  }

  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      // console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['admin/login']);
      }
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }




  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalServices.show(template);
    this.adminDetails = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.updateProfile = this.adminDetails;
  }


  changePasswordModal(template2: TemplateRef<any>) {
    this.modalRef = this.modalServices.show(template2);
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

      // Encrypt Password
      this.changePassword.oldpassword = btoa(this.changePassword.oldpassword);
      this.changePassword.newpassword = btoa(this.changePassword.newpassword);
      this.changePassword.confirmpassword = btoa(this.changePassword.confirmpassword);

      this.adminService.changePassword(id, this.changePassword).subscribe((data: any) => {
        if (data.Status.code === 0) {
          this.toastr.success('Password changed successfully', 'Successful', {
            disableTimeOut: false
          });
          this.changePassword = new changePasswordModel();
        } else  
        if (data.Status.code === 1) {
          this.toastr.warning('Old Password is incorrect', 'Warning', {
            disableTimeOut: false,
            timeOut: 2000
          });
          this.modalRef.hide();
        }
         else
        if (data.Status.code === 2) {
          this.toastr.warning('Enter different password', 'Warning', {
            disableTimeOut: false,
            timeOut: 2000
          });
        }
      }, (err) => {

      });
    } else 
   {
      this.toastr.error('New Password & Confirm Password didnt match', 'Error', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }


  updateadminProfile() {

    // let strError = '';

    // if (!this.register.username) {
    //   strError += '- Please enter username';
    // }
    // else {
    //   if (!this.validateName(this.register.username)) {
    //     strError += strError = '' ? '' : '<br/>';
    //     strError += strError = '- First name should be in alphabets';
    //   }
    // }

    // if (!this.register.gender) {
    //   strError += strError = '' ? '' : '<br/>';
    //   strError += '- Please select gender';
    // }

    // if (!this.register.mobile) {
    //   strError += strError = '' ? '' : '<br/>';
    //   strError += '- Please enter valid mobile no.';
    // }
    // else {
    //   if (!this.validateMobile(this.register.mobile)) {
    //     strError += strError = '' ? '' : '<br/>';
    //     strError += strError = '- Mobile no should be of 10 digits';
    //   }
    // }

    // if (strError !== '') {
    //   this.toastr.warning(strError, 'Warning', {
    //     disableTimeOut: false,
    //     timeOut: 2000,
    //     enableHtml: true,
    //     progressBar: true,
    //     closeButton: true,
    //   });
    //   return false;
    // }


    this.adminService.UpdateAdminProfile(this.updateProfile).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert("Profile updated successfully");
        this.toastr.success('Profile Updated Successful', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });

        this.modalRef.hide();
        localStorage.setItem('adminLogin', JSON.stringify(data.loginDetail[0] || {}));
        this.getuserProfile();

        this.modalRef.hide();
      }
    }, (err) => {
    });
  }



  firstnameValidation() {
    let isValid = false;
    if (!this.validateName(this.register.username)) {
      // alert('Please enter valid name.')
      // this.errorMessage="Please enter valid first name";
      isValid = true;
    }

    if (isValid) {
      this.toastr.warning('Please enter username correctly', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }



  validateName(nameField) {
    const reg = /^[A-Za-z\s]+$/;
    return reg.test(nameField) === false ? false : true;
  }

  // Email Validation

  checkEmailValidation() {
    let isValid = false;
    if (!this.validateEmail(this.register.email)) {
      // alert('Please enter valid email.')
      // this.errorMessage="Please enter valid email";
      //  return false;
      isValid = true;
    }

    if (isValid) {
      this.toastr.warning('Please enter valid email id', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }

  validateEmail(emailField) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(emailField) === false ? false : true;
  }


  // Mobile no.  Validation

  mobValidation() {
    let isValid = false;
    if (!this.validateMobile(this.register.mobile)) {

      isValid = true;
    }

    if (isValid) {
      this.toastr.warning('Please enter valid mobile number', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }
  }

  validateMobile(mobileField) {
    const reg = /^\d{10}$/;
    return reg.test(mobileField) === false ? false : true;
  }


  delete_profile_pic(id: number) {
    this.updateProfile.image = null;
    this.profile_pic.image = null;
    this.pro.ImageData = null;
    this.avatar.image = null;

    this.salesService.delete_profile_pic(id).subscribe((data: any) => {
      if (data.Status.code === 0) {
        localStorage.setItem('adminLogin', JSON.stringify(data.loginDetail[0] || {}));

        this.toastr.success('Profile pic deleted Successful', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });

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

        this.pro.ImageData = String(reader.result);
        // this.tempImage.push({ ImageId: 0, ImageData: String(reader.result) });

        this.updateProfile.image = imageDetail[1];

        // this.tempImageList.push({ImageData: String(reader.result) });
        this.updateProfile.ImageExtn = '.' + imageDetail[0].replace('data:image/', '');
        image.height = 100;
        image.width = 100;
        preview.appendChild(image);
      };
      reader.readAsDataURL(file);
      // console.log(file);

    });
  }




  salesRegister() {

    let strError = '';

    if (!this.salesregister.salesName) {
      strError += '- Please enter username';
    } else {
      if (!this.validateName(this.salesregister.salesName)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- First name should be in alphabets';
      }
    }


    if (!this.salesregister.email) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter valid email id';
    } else {
      if (!this.validateEmail(this.salesregister.email)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Email should contain @ and . ';
      }
    }



    if (!this.salesregister.password) {
      strError += '- Please enter valid password';
    } else {
      if (!this.passwordValidation(this.salesregister.password)) {
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

    if (this.salesregister.password === this.salesregister.cpassword) {

      this.salesService.SalesRegisterService(this.register).subscribe((data: any) => {
        if (data.Status.code === 0) {
          // alert('Sales Registered sucesfully');
          this.toastr.success('Registration Successful', 'Successful', {
            disableTimeOut: false,
            timeOut: 2000
          });
        } else {
          // alert("Not Matched");
          this.toastr.error('Password & Confirm Password didnt match', 'Error', {
            disableTimeOut: false,
            timeOut: 2000
          });
        }
        this.salesregister = new salesregisterModel();
      }
        , (err) => {

        });
    }
  }


  passwordValidation(passwordField) {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return reg.test(passwordField) === false ? false : true;
  }


  adminForm() {
    this.router.navigate(['/register']);
  }

  loginForm() {
    this.router.navigate(['/sales/login']);
  }
  adminregisterForm() {
    this.router.navigate(['/admin/register']);
  }

  salesregisterForm() {
    this.router.navigate(['/sales/register']);
  }

  logout() {
    // remove user from local storage to log user out
    this.register = JSON.parse(localStorage.getItem('adminLogin')) || {};
    let id = this.register.id;

    this.adminService.AdminLogoutService(id).subscribe((data: any) => {
      if (data.Status.code === 0) {
        this.toastr.success('Logged out Successfully', 'Successful', {
          disableTimeOut: false
        });

        localStorage.removeItem('adminLogin');
      }
    }
    );


  }
  getuserProfile() {
    this.register = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.avatar.image = this.register.image;

    // To display image in update profile modal
    this.profile_pic.image = this.register.image;
    this.username = this.register.username;

  }
}
