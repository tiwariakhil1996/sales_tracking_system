import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { CountryStateCityService } from '../../../service/country-state-city.service';
import { ClientService } from '../../../service/client.service';
import { clientModel, clientListModel } from '../../../model/client';
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

  RoleJason = {
    ROle: [0, 1],
    Component: "ViewClientComponent"
  }

  constructor(private router: Router,
    private toastr: ToastrService,
    private clientService: ClientService,
    private modalService: NgbModal,
    private country_state_cityService: CountryStateCityService) {
    this.clientList();

    this.countryList();

  }
  ngOnInit() {
    this.checkRole(this.RoleJason)
  }

  checkRole(RoleJason) {
    var result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component == RoleJason.Component) {
      console.log(result);
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

  clientList() {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.client.userid = this.user.id;
    console.log(this.client.userid);

    this.clientService.each_admin_ClientList(this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.each_admin_ClientList) {
          this.clientDetails = data.each_admin_ClientList;
          console.log(this.clientDetails);

        }
      }
    }, (err) => {

    });
  }

  // Edit
  openupdatemodal(content, item) {
    this.client = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });

  }

  onEdit(id: number) {
    this.user = JSON.parse(localStorage.getItem('adminLogin')) || {};
    this.client.modifiedby = this.user.id;
    console.log(this.client.modifiedby);

    this.clientService.updateClient(id, this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Client updated sucesfully');
        this.toastr.success('Client updated sucesfully', 'Successful', {
          disableTimeOut: false
        });
      }
      this.client = new clientListModel();
      this.clientList();
    }, (err) => {
    });
  }

  onDelete(id: number) {
    // if (confirm('Are you sure to delete this record ?') === true) {
    this.clientService.deleteClient(id).subscribe(data => {
      this.clientList();
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
      this.clientList();
    });
  }

  addnewClient() {
    this.router.navigate(['/admin/client/addclient']);
  }

}
