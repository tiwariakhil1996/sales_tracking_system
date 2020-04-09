import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryStateCityService } from '../../../service/country-state-city.service';
import { ClientService } from '../../../service/client.service';
import { clientModel, clientListModel, paginationModel } from '../../../model/client';
import { countryModel, stateModel, cityModel } from '../../../model/country-state-city';
import { ToastrService } from 'ngx-toastr';
import { salesregisterModel, LocationModel } from '../../../model/sales';
import { SalesService } from '../../../service/sales.service';

@Component({
  selector: 'app-viewclient',
  templateUrl: './viewclient.component.html',
  styleUrls: ['./viewclient.component.css']
})
export class ViewclientComponent implements OnInit {

  user = new salesregisterModel();

  saleslocation = new LocationModel();
  saleslocationDetails: LocationModel[] = [];

  client = new clientListModel();
  clientDetails: clientListModel[] = [];

  country = new countryModel();
  countryDetails: countryModel[] = [];

  state = new stateModel();
  stateDetails: stateModel[] = [];

  city = new cityModel();
  cityDetails: cityModel[] = [];

  // totalClients: any ;

  search_: any;

  // Pagination
  RowCount: number;
  pageSize: number = 5;
  totalPageList: paginationModel[] = [];
  totalPageSize: number;
  pagesize: any;
  currentPageIndex: number = 0;
  pageOfItems: Array<any>;

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

  // Authentication
  RoleJason = {
    ROle: [0, 1],
    Component: 'ViewClientComponent'
  };

  constructor(private router: Router,
    private clientService: ClientService,
    private modalService: NgbModal,
    private salesService: SalesService,
    private country_state_cityService: CountryStateCityService,
    private toastr: ToastrService) {
    // this.clientList();

    this.countryList();
  }

  ngOnInit() {
    this.checkRole(this.RoleJason);

    const item = { pageIndex: 0 };
    this.clientList(item);

    this.Refresh_Location();

    // For google map
    navigator.geolocation.getCurrentPosition(position => {
      this.location = position.coords;
      // When map opens there marker will be 1st in center
      this.centerlat = this.location.latitude;
      this.centerlng = this.location.longitude;
    });
  }

  Refresh_Location() {
    navigator.geolocation.getCurrentPosition(position => {
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
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.saleslocation.userid = this.user.id;
    this.saleslocation.latitude = this.lat;
    this.saleslocation.longitude = this.lng;

    this.salesService.Refresh_Sales_Location(this.saleslocation).subscribe((data: any) => {
    }, (err) => {

    });
  }


  markerDragEnd($event: any) {
    // console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.client.latitude = this.latitude;
    this.client.longitude = this.longitude;
  }


  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('salesLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['sales/login']);
      }
    }
  }

  // Display

  // clientList(){
  //   this.clientService.clientList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.ClientList) {
  //         this.clientDetails = data.ClientList;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

  // clientList() {
  //   this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
  //   this.client.userid = this.user.id;
  //   console.log(this.client.userid);

  //   this.clientService.each_sales_ClientList(this.client).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.each_sales_ClientList) {
  //         this.clientDetails = data.each_sales_ClientList;
  //         console.log(this.clientDetails);

  //       }
  //     }
  //   }, (err) => {

  //   });
  // }


  onsearch() {
    const item = { pageIndex: 0 };
    this.clientList(item);
  }

  clientList(item) {
    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.client.userid = this.user.id;

    this.client.pageIndex = item.pageIndex;
    this.client.pageSize = this.pageSize;

    this.client.search = this.search_;

    this.clientService.each_sales_ClientList(this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_sales_ClientList) {
          this.clientDetails = data.each_sales_ClientList;
          // this.totalClients = this.clientDetails.length;
          // console.log(this.totalClients );

        }
        if (data.RowCount) {
          this.RowCount = data.RowCount;
        }
        this.totalPageSize = Math.ceil(this.RowCount / this.pageSize);
        // console.log(totalPageSize);

        this.totalPageList = [];
        for (let i = 0; i < this.totalPageSize; i++) {
          this.totalPageList.push({ pageSize: i + 1, pageIndex: i });

        }
        this.currentPageIndex = item.pageIndex;
      }
    }, (err) => {

    });

  }
  // Edit
  openupdatemodal(content, item) {
    this.client = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { size: 'xl', backdropClass: 'light-blue-backdrop' });

  }

  onEdit(id: number) {
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
    } else
      if (!this.validateAddress(this.client.address)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '-  Address should only contain alphabets, numbers, space and . ,';
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

    this.user = JSON.parse(localStorage.getItem('salesLogin')) || {};
    this.client.modifiedby = this.user.id;
    console.log(this.client.modifiedby);

    this.clientService.updateClient(id, this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Client updated sucesfully');
        this.toastr.success('Client updated Successful', 'Successful', {
          disableTimeOut: false,
          timeOut: 2000
        });
        this.modalService.dismissAll();
      } else {
        this.toastr.info('This email id is already registered', 'Info', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
      // this.clientList();

      const item = { pageIndex: 0 };
      this.clientList(item);
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

  addressValidation() {
    let isValid = false;
    if (!this.validateAddress(this.client.address)) {
      isValid = true;
    }

    if (isValid) {
      this.toastr.warning('Please enter address correctly', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }

  validateAddress(addressField) {
    const reg = /^[A-Za-z0-9\s.,]+$/;
    return reg.test(addressField) === false ? false : true;
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

  // Delete
  onDelete(id: number) {
    // if (confirm('Are you sure to delete this record ?') === true) {
    this.clientService.deleteClient(id).subscribe(data => {
      this.clientService.clientList();
      // this.clientList();

      const item = { pageIndex: 0 };
      this.clientList(item);
    });
    // }
    this.toastr.success('Client is deleted Successful', 'Successful', {
      disableTimeOut: false,
      timeOut: 2000
    });
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


  changeStatus(id: number) {
    console.log(id);
    this.clientService.changeStatus(id).subscribe(data => {
      // this.clientList();
      const item = { pageIndex: 0 };
      this.clientList(item);
    });
  }


  addnewClient() {
    this.router.navigate(['/sales/client/addclient']);
  }


}
