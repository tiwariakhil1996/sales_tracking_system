import {Component, TemplateRef } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { registerModel, clientModel } from '../../model/model';
import { CommonService } from '../../service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  register = new registerModel();
  adminDetails: registerModel[] = [];
  
  client = new clientModel();
  clientDetails: clientModel[] = [];
  
  constructor(private router: Router,private adminService: AdminService,private clientService: CommonService, private modalService: NgbModal) {
 
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  adminregisterForm(){
    this.router.navigate(['/admin/register']);
  }

  salesregisterForm(){
    this.router.navigate(['/sales/register']);
  }

  adminprofile(content, admin){
   // this.register = admin;
    // data show in model use this line and store the data in user and display in ui
   // this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openupdatemodal(content, item) {
    this.client = item;
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });

  }

  onEdit(){

  }

}
