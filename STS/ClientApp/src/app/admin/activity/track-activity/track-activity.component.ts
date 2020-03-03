import { Component, OnInit } from '@angular/core';


// For Map

import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { MouseEvent } from '@agm/core';
import { google } from 'google-maps';
import { Router } from '@angular/router';
import { CurrentactivityComponent } from '../currentactivity/currentactivity.component';
import { activityModel, LocationModel } from '../../../model/activity';
import { ActivityService } from '../../../service/activity.service';
import { registerModel } from '../../../model/admin';

@Component({
  selector: 'app-track-activity',
  templateUrl: './track-activity.component.html',
  styleUrls: ['./track-activity.component.css']
})
export class TrackActivityComponent implements OnInit {

  
  user = new registerModel();
  
  activity = new activityModel();
  activityDetails: activityModel[] = [];
  
  Activity_Location = new LocationModel();
  Activity_LocationDetails: LocationModel[] = [];
  // For Map

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

// Authentication

  RoleJason = {
    ROle: [0, 1],
    Component: 'TrackActivityComponent'
  };

  constructor(
    private activityService: ActivityService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.geocoder = new google.maps.Geocoder;
   }

  ngOnInit() {
    this.eachactivityList();
    this.checkRole(this.RoleJason);

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

    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);

        this.location = position.coords;
        this.centerlat = this.Activity_Location.latitude;
        this.centerlng = this.Activity_Location.longitude;
        this.lat = this.Activity_Location.latitude;
        this.lng = this.Activity_Location.longitude;
        this.geocoder = new google.maps.Geocoder();
      });
    }, 2000);

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

  
  // Get Current Location Coordinates
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 8;
  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }


  // markerDragEnd($event: MouseEvent) {
  //   // console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   // this.getAddress(this.latitude, this.longitude);
  // }

  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     // console.log(results);
  //     // console.log(status);
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //       // console.log(this.address);

  //     }
  //   });
  // }
  
  Get_Lat_Long_of_Activity(aid) {
    this.activity_Location(aid);
  }

  activity_Location(aid) {
    this.activityService.activity_Location(aid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.Activity_Location) {
          this.Activity_LocationDetails = data.Activity_Location;
          // console.log( this.Activity_LocationDetails);
          
        }
      }
    }, (err) => {

    });
  }

  
  eachactivityList() {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.activity.userid = this.user.id;
    // console.log(this.activity.userid);

    this.activityService.each_admin_activityList(this.activity).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_admin_activityList) {
          this.activityDetails = data.each_admin_activityList;
          // console.log(this.activityDetails);

        }
      }
    }, (err) => {

    });
  }

}
