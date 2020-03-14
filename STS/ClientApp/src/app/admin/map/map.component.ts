
import { Router } from '@angular/router';

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { MouseEvent } from '@agm/core';
import { google } from 'google-maps';
import { AdminService } from '../../service/admin.service';
import { registerModel } from '../../model/admin';
import { ActivityService } from '../../service/activity.service';
import { sales_Location_Model } from '../../model/activity';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  user = new registerModel();

  Sales_Location = new sales_Location_Model();
  Sales_LocationDetails: sales_Location_Model[] = [];

  _admin = 'A';

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

  // openedWindow : number = 0; // alternative: array of numbers

  private geoCoder;

  // Link to get lots of icon form agm marker
  // http://kml4earth.appspot.com/icons.html

  iconAdmin= 'http://maps.google.com/mapfiles/kml/paddle/A.png';
  iconSales= 'http://maps.google.com/mapfiles/kml/shapes/cycling.png';
  


  location: Coordinates;
  // lat: any;
  // lng: any;
  lat: number;
  lng: number;

 

  centerlat: number;
  centerlng: number;
  // centerlat: any;
  // centerlng: any;
  geocoder: any;

  
  @ViewChild(AgmMap) map: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  RoleJason = {
    ROle: [0, 1],
    Component: 'MapComponent'
  };

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private activityService: ActivityService

  ) {
    // this.geoCoder = new google.maps.Geocoder;
    this.geocoder = new google.maps.Geocoder;
    // console.log(this.geocoder);
    
  }

  ngOnInit() {
    // this.setCurrentLocation();
    this.sales_Location();

    this.checkRole(this.RoleJason);

    // setTimeout(() => {
      navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);

        this.location = position.coords;
        
        // When map opens there marker will be 1st in center
        this.centerlat = this.location.latitude;
        this.centerlng = this.location.longitude;

        // This is the current lat long
        this.lat = this.location.latitude;
        this.lng = this.location.longitude;

        // this.geocoder = new google.maps.Geocoder();

       

        // console.log(this.geocoder );
        
      });
    // }, 2000);


    // load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();

    //   this.geoCoder = new google.maps.Geocoder;
    //   console.log(this.geoCoder);
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     types: ["address"]
    //   });

    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    //       // console.log(place);
          
    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }
    //       //set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });

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
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


 

  getAddress(latitude, longitude) {
    this.geoCoder.geocoder({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
        // console.log(this.address);

      }
    });
  }



  markerDragEnd($event: MouseEvent) {
    // console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }


// openWindow(id) {
//     this.openedWindow = id; // alternative: push to array of numbers
// }

// isInfoWindowOpen(id) {
//     return this.openedWindow == id; // alternative: check if id is in array
// }


  sales_Location() {

    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.Sales_Location.userId = this.user.id;

    this.activityService.each_admins_sales_Location(this.Sales_Location).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_admins_sales_Location) {
          this.Sales_LocationDetails = data.each_admins_sales_Location;
          console.log(this.Sales_LocationDetails);
        }
      }
    }, (err) => {

    });
  }


}
