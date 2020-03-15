import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CountryStateCityService } from '../../../service/country-state-city.service';
import { ClientService } from '../../../service/client.service';
import { clientModel } from '../../../model/client';
import { countryModel, stateModel, cityModel } from '../../../model/country-state-city';
import { registerModel } from '../../../model/admin';
import { MapsAPILoader, AgmMap } from '@agm/core';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {


  user = new registerModel();

  client = new clientModel();
  clientDetails: clientModel[] = [];

  country = new countryModel();
  countryDetails: countryModel[] = [];

  state = new stateModel();
  stateDetails: stateModel[] = [];

  city = new cityModel();
  cityDetails: cityModel[] = [];

  // For map
  location: Coordinates;
  lat: number;
  lng: number;
  centerlat: number;
  centerlng: number;
  geocoder: any;

  
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

  @ViewChild(AgmMap) map: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  
  // Authentication
  RoleJason = {
    ROle: [0, 1],
    Component: 'AddclientComponent'
  };

  constructor(private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
     private toastr: ToastrService,
     private clientService: ClientService,
     private country_state_cityService: CountryStateCityService) {

    this.countryList();

    this.geocoder = new google.maps.Geocoder;
  }
  ngOnInit() {
    this.checkRole(this.RoleJason);

     // For google map
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        
        // When map opens there marker will be 1st in center
        this.centerlat = this.location.latitude;
        this.centerlng = this.location.longitude;

        // This is the current lat long
        // this.lat = this.location.latitude;
        // this.lng = this.location.longitude;

      });
  }

  markerDragEnd($event: any) {
    // console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.client.latitude=this.latitude;
    this.client.longitude=this.longitude;
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


  submitForm() {

    let strError = '';

    if (!this.client.clientName) {
      strError += strError = '- Please enter clientname';
    } else
    if (!this.validateName(this.client.clientName)) {
      strError += strError = '' ? '' : '<br/>';
      strError += strError = '- Client name should only contain alphabets';
    }

    if (!this.client.email) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter valid email id';
    } else {
      if (!this.validateEmail(this.client.email)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Email should contain @ and . ';
      }
    }

    if (!this.client.contact) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter valid mobile no.';
    } else {
      if (!this.validateMobile(this.client.contact)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Mobile no should be of 10 digits';
      }
    }
    if (!this.client.gender) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select gender';
    }

    if (!this.client.address) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter address';
    }

    if (!this.client.street) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter street';
    }

    if (!this.client.cid) {
      strError += strError = '' ? '' : '<br/>';
      strError += strError = '- Please select country';
    } else
    if (!this.client.sid) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select state';
    } else
    if (!this.client.cityid) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select city';
    }

    if (!this.client.postalCode) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter postalcode';
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


    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.client.createdby = this.user.id;
    // console.log(this.client.createdby);


    this.clientService.addClient(this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Registered sucesfully');
        this.toastr.success('Client added sucesfully', 'Successful', {
          disableTimeOut: false
        });
        this.client = new clientModel();
      } else {
        // alert("Not Matched");
        this.toastr.info('This email id is already registered', 'Info', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
    }, (err) => {


    });
  }


  firstnameValidation() {
    let isValid = false;
    if (!this.validateName(this.client.clientName)) {
      isValid = true;
    }

    if (isValid) {
      this.toastr.warning('Please enter clientname correctly', 'Warning', {
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
  if (!this.validateEmail(this.client.email)) {
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
  if (!this.validateMobile(this.client.contact)) {
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


  countryList() {
    this.country_state_cityService.countryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CountryList) {
          this.countryDetails = data.CountryList;

        }
      }
    }, (err) => {

      console.log(err);
    });
  }


  onCountryChange(cid) {
    this.stateList(cid);
  }

  onStatechange(sid) {
    this.cityList(sid);
  }

  stateList(cnid) {
    this.country_state_cityService.stateList(cnid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.StateList) {
          this.stateDetails = data.StateList;
        }
      }
    }, (err) => {

      console.log(err);
    });
  }

  cityList(stid) {
    this.country_state_cityService.cityList(stid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CityList) {
          this.cityDetails = data.CityList;
        }
      }
    }, (err) => {

      console.log(err);
    });
  }


  viewClientForm() {
    this.router.navigate(['/admin/client/viewclient']);

  }
}
