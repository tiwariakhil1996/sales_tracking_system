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

      this.lat_lng();
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





// import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
// import { MapsAPILoader, AgmMap } from '@agm/core';
// import { MouseEvent } from "@agm/core";
// import { google } from "google-maps";

// declare var google : google;

// @Component({
//   // tslint:disable-next-line
//   selector: 'body',

//   //template: '<router-outlet></router-outlet>',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {

//   latitude: number;
//   longitude: number;
//   zoom: number;
//   address: string;

//   private geoCoder;


//   location: Coordinates;
//   lat: any;
//   lng: any;
//   centerlat: any;
//   centerlng: any;
//   geocoder: any;
//   @ViewChild(AgmMap) map: any;

//   @ViewChild('search')
//   public searchElementRef: ElementRef;
//   constructor(
//     private mapsAPILoader: MapsAPILoader,
//     private ngZone: NgZone
//   ) {
//     this.geocoder = new google.maps.Geocoder;
//   }

//   ngOnInit() {

//     setTimeout(() => {
//       navigator.geolocation.getCurrentPosition(position => {
//         console.log(position);

//         this.location = position.coords;
//           this.centerlat = this.location.latitude;
//           this.centerlng = this.location.longitude;
//           this.lat = this.location.latitude;
//           this.lng = this.location.longitude;
//         this.geocoder = new google.maps.Geocoder();
//       });
//     }, 2000);

//     // //load Places Autocomplete
//     // this.mapsAPILoader.load().then(() => {
//     //   this.setCurrentLocation();

//     //   this.geoCoder = new google.maps.Geocoder;
//     //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
//     //     types: ["address"]
//     //   });

//     //   autocomplete.addListener("place_changed", () => {
//     //     this.ngZone.run(() => {
//     //       //get the place result
//     //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
//     //       //verify result
//     //       if (place.geometry === undefined || place.geometry === null) {
//     //         return;
//     //       }
//     //       //set latitude, longitude and zoom
//     //       this.latitude = place.geometry.location.lat();
//     //       this.longitude = place.geometry.location.lng();
//     //       this.zoom = 12;
//     //     });
//     //   });
//     // });
//   }
//   // Get Current Location Coordinates
//   private setCurrentLocation() {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         this.latitude = position.coords.latitude;
//         this.longitude = position.coords.longitude;
//         this.zoom = 8;
//         this.getAddress(this.latitude, this.longitude);
//       });
//     }
//   }


// markerDragEnd($event: MouseEvent) {
//     console.log($event);
//     this.latitude = $event.coords.lat;
//     this.longitude = $event.coords.lng;
//     // this.getAddress(this.latitude, this.longitude);
//   }

// getAddress(latitude, longitude) {
//     this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
//       console.log(results);
//       console.log(status);
//       if (status === 'OK') {
//         if (results[0]) {
//           this.zoom = 12;
//           this.address = results[0].formatted_address;
//         } else {
//           window.alert('No results found');
//         }
//       } else {
//         window.alert('Geocoder failed due to: ' + status);
//         console.log(this.address);

//       }
//     });
//   }
// }
