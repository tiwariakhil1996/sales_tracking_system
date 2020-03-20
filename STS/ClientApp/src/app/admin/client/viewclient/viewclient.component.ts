import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { CountryStateCityService } from '../../../service/country-state-city.service';
import { ClientService } from '../../../service/client.service';
import { clientModel, clientListModel, paginationModel } from '../../../model/client';
import { countryModel, stateModel, cityModel } from '../../../model/country-state-city';
import { registerModel } from '../../../model/admin';

@Component({
  selector: 'app-viewclient',
  templateUrl: './viewclient.component.html',
  styleUrls: ['./viewclient.component.css']
})
export class ViewclientComponent implements OnInit {

  user = new registerModel();

  client = new clientListModel();
  clientDetails: clientListModel[] = [];

  country = new countryModel();
  countryDetails: countryModel[] = [];

  state = new stateModel();
  stateDetails: stateModel[] = [];

  city = new cityModel();
  cityDetails: cityModel[] = [];

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
    private toastr: ToastrService,
    private clientService: ClientService,
    private modalService: NgbModal,
    private country_state_cityService: CountryStateCityService) {
    // this.clientList();

    this.countryList();


  }
  ngOnInit() {
    this.checkRole(this.RoleJason);

    const item = { pageIndex: 0 };
    this.clientList(item);

    // For google map
    navigator.geolocation.getCurrentPosition(position => {
      this.location = position.coords;
      // When map opens there marker will be 1st in center
      this.centerlat = this.location.latitude;
      this.centerlng = this.location.longitude;
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
    const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      // console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['admin/login']);
      }
    }
  }



  // Display

  // clientList() {
  //   this.clientService.clientList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.ClientList) {
  //         this.clientDetails = data.ClientList;
  //         // console.log( this.clientDetails);
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

  // clientList() {
  //   this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
  //   this.client.userid = this.user.id;
  //   // console.log(this.client.userid);

  //   this.clientService.each_admin_ClientList(this.client).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.each_admin_ClientList) {
  //         this.clientDetails = data.each_admin_ClientList;
  //         // console.log(this.clientDetails);

  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

  // onChangePage(pageOfItems: Array<any>) {
  //   // update current page of items
  //   this.pageOfItems = pageOfItems;
  // }

  onsearch() {
    const item = { pageIndex: 0 };
    this.clientList(item);
  }

  clientList(item) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.client.userid = this.user.id;
    this.client.pageIndex = item.pageIndex;
    this.client.pageSize = this.pageSize;
    this.client.search = this.search_;

    this.clientService.each_admin_ClientList(this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_admin_ClientList) {
          this.clientDetails = data.each_admin_ClientList;

        }
        if (data.RowCount) {
          this.RowCount = data.RowCount
        }
        this.totalPageSize = Math.ceil(this.RowCount / this.pageSize);
        // console.log(totalPageSize);

        this.totalPageList = [];
        for (var i = 0; i < this.totalPageSize; i++) {
          this.totalPageList.push({ pageSize: i + 1, pageIndex: i })

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
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.client.modifiedby = this.user.id;
    // console.log(this.client.modifiedby);

    this.clientService.updateClient(id, this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Client updated sucesfully');
        this.toastr.success('Client updated sucesfully', 'Successful', {
          disableTimeOut: false
        });
      }
      this.client = new clientListModel();
      // this.clientList();
      const item = { pageIndex: 0 };
      this.clientList(item);
    }, (err) => {
    });
  }

  // onDelete(id: number) {
  //   if (confirm('Are you sure to delete this record ?') == true) {
  //     this.clientService.deleteClient(id)
  //     .subscribe(x => {
  //       this.clientService.deleteClient(id);
  //     alert("Deleted Successfully");
  //     })
  //   }
  // }


  onDelete(id: number) {
    this.clientService.deleteClient(id).subscribe(data => {
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
    // console.log(id);
    this.clientService.changeStatus(id).subscribe(data => {
      // this.clientList();
      const item = { pageIndex: 0 };
      this.clientList(item);
    });
  }

  addnewClient() {
    this.router.navigate(['/admin/client/addclient']);
  }

}
