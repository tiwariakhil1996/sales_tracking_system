import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { registerModel } from './model/admin';
import { LocationModel } from './model/sales';
import { SalesService } from './service/sales.service';


import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { MouseEvent } from '@agm/core';
import { google } from 'google-maps';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  user = new registerModel();

  saleslocation = new LocationModel();
  saleslocationDetails: LocationModel[] = [];

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
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.geocoder = new google.maps.Geocoder;
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    //  this.lat_lng();
    // setTimeout(() => {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     // console.log(position);

    //     this.location = position.coords;
    //     this.centerlat = this.location.latitude;
    //     this.centerlng = this.location.longitude;

    //     this.lat = this.location.latitude;
    //     this.lng = this.location.longitude;

    //     this.geocoder = new google.maps.Geocoder();
    //   });
    // }, 2000);

    // this.lat_lng();
  }

  // lat_lng() {
  //  setInterval(function(){
  //   navigator.geolocation.getCurrentPosition(position => {
  //     // console.log(position);

  //     this.location = position.coords;
  //     this.centerlat = this.location.latitude;
  //     this.centerlng = this.location.longitude;

  //     this.lat = this.location.latitude;
  //     this.lng = this.location.longitude;

  //     console.log(this.lat);
  //     console.log(this.lng);


  //     this.geocoder = new google.maps.Geocoder();
  //     this.Refresh_Sales_Location();
  //   });

  // }, 1000);
  // }


  lat_lng() {
    navigator.geolocation.getCurrentPosition(position => {
      // console.log(position);

      this.location = position.coords;
      this.centerlat = this.location.latitude;
      this.centerlng = this.location.longitude;

      this.lat = this.location.latitude;
      this.lng = this.location.longitude;

      console.log(this.lat);
      console.log(this.lng);

      this.geocoder = new google.maps.Geocoder();
      this.Refresh_Sales_Location();
    });
  }

  Refresh_Sales_Location() {

    // this.lat_lng();

    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.saleslocation.userid = this.user.id;


    this.saleslocation.latitude = this.lat;
    this.saleslocation.longitude = this.lng;

    console.log(this.saleslocation);

    this.salesService.Refresh_Sales_Location(this.saleslocation).subscribe((data: any) => {

    }, (err) => {

    });
  }

}

