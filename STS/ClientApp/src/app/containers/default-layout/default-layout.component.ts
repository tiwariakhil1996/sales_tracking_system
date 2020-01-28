import {Component, TemplateRef } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { registerModel, clientModel } from '../../model/model';
import { CommonService } from '../../service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../service/admin.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  modalRef: BsModalRef;
  
  register = new registerModel();
  adminDetails: registerModel[] = [];
  item: any;
  updateProfile: any;

  
  constructor(private router: Router,
    private adminService: AdminService,
     private modalService: NgbModal) 
     {
 
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }


  adminprofile(content, admin){
   // this.register = admin;
    // data show in model use this line and store the data in user and display in ui
   // this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openupdatemodal(content, register) {
    this.register = JSON.parse(localStorage.getItem('loginDetail'));
    this.item = register;
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });

  }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template, this.config);
  //   this.adminDetails = JSON.parse(localStorage.getItem('loginDetails')) || [];
  //   console.log(this.adminDetails);
  //   this.updateProfile = this.adminDetails.register[0];
  // }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template, this.config);
  //   this.adminDetails = JSON.parse(localStorage.getItem('loginDetail')) || [];
  //   console.log(this.adminDetails);
  //   this.updateProfile = this.adminDetails.loginDetail[0];
  // }

  onEdit(){

  }

  
  adminregisterForm(){
    this.router.navigate(['/admin/register']);
  }

  salesregisterForm(){
    this.router.navigate(['/sales/register']);
  }

}
