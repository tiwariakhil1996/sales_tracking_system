import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  // RoleJason = {
  //   ROle: [0, 1],
  //   Component: "DashboardComponent,ActivityComponent,ProductComponent,ClientComponent,RegisterComponent,MapComponent,SalesdataComponent,ForgotPasswordComponent,CategorySubcategoryComponent"
  // }

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    // this.checkRole(this.RoleJason)
  }

  // checkRole(RoleJason) {
  //   var result = JSON.parse(localStorage.getItem('adminLogin')) || [];
  //   if (this.RoleJason.Component == RoleJason.Component) {
  //     console.log(result);
  //     if (!this.RoleJason.ROle.includes(result.userType)) {
  //       this.router.navigate(['admin/login']);
  //     }
  //   }
  // }


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