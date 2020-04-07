import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from '../../service/sales.service';
import { salesregisterModel } from '../../model/sales';

import {ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { MouseEvent } from '@agm/core';
import { google } from 'google-maps';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class SalesLoginComponent implements OnInit {
  title = 'STS';
  loginDetail = new salesregisterModel();
  salesDetails: salesregisterModel[] = [];


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

  constructor(private router: Router,
    private salesService: SalesService,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {

    this.geocoder = new google.maps.Geocoder;

     this.logout();

  }
  ngOnInit() {

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


  submitLogin() {
    this.loginDetail.latitude = this.lat;
        this.loginDetail.longitude = this.lng;

    console.log(this.loginDetail.latitude);
    console.log(this.loginDetail.longitude);
    
    
    this.salesService.SalesLoginService(this.loginDetail).subscribe((data: any) => {
      if (data.Status.code === 0) {
        localStorage.setItem('salesLogin', JSON.stringify(data.loginDetail[0] || {}));
        // alert('Sales Login Successfully');
        this.toastr.success('Login Successful', 'Successful', {
          disableTimeOut: false
        });

        this.router.navigate(['/sales/dashboard']);
      } else {
        this.toastr.warning('Either your username and password didnt matched or This account is temporarily blocked', 'Warning', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
    }, (err) => {
    });
    }

    logout() {
      // remove user from local storage to log user out
      this.loginDetail = JSON.parse(localStorage.getItem('salesLogin')) || {};
      let id = this.loginDetail.id;
  
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



  registerForm() {
    this.router.navigate(['/sales/register']);
  }

  
  forgotPassword() {
    this.router.navigate(['/sales/forgot-password-sales']);
  }


}



