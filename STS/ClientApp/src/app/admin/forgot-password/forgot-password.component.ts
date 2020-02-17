import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';
import { registerModel } from '../../model/admin';


@Component({
  // selector: 'app-forgot-password',
  selector: 'app-dashboard',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  loginDetail = new registerModel();
  adminDetails: registerModel[] = [];

  constructor(private router: Router, private adminService: AdminService, private toastr: ToastrService) {



  }

  ngOnInit() {
  }


  submitLogin() {

  }
}
