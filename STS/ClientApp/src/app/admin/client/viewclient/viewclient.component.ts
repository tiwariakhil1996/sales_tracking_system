import { Component, OnInit } from '@angular/core';
import { clientModel, countryModel, stateModel, cityModel } from '../../../model/model';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from '../../../service/country';
import { State } from '../../../service/state';
import { City } from '../../../service/city';

@Component({
  selector: 'app-viewclient',
  templateUrl: './viewclient.component.html',
  styleUrls: ['./viewclient.component.css']
})
export class ViewclientComponent implements OnInit {


  client = new clientModel();
  clientDetails: clientModel[] = [];

  country= new countryModel();
  countryDetails: countryModel[]=[];

  state= new stateModel();
  stateDetails: stateModel[]=[];

  city = new cityModel();
  cityDetails: cityModel[]=[];
  
  constructor(private router: Router, private clientService: CommonService, private modalService: NgbModal) {
    this.clientList();

    this.countryList();

  }
  ngOnInit() {
  }



  // Display

  clientList() {
    this.clientService.clientList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ClientList) {
          this.clientDetails = data.ClientList;
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

  onEdit(id:number) {
    // this.client.image = this.imageSrc;
    this.clientService.updateClient(id, this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Client updated sucesfully');
      }
      this.client = new clientModel();
      this.clientList();
    }, (err) => {
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.clientService.deleteClient(id).subscribe(data => {
        this.clientService.clientList();
        this.clientList();
      });
    }
  }


  countryList() {
    this.clientService.countryList().subscribe((data: any) => {
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

  
  onStatechange(sid){
    this.cityList(sid);
  }

  stateList(cnid) {
    this.clientService.stateList(cnid).subscribe((data: any) => {
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
    this.clientService.cityList(stid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.cityList) {
          this.cityDetails = data.cityList;
        }
      }
    }, (err) => {
      
      console.log(err); 
    });
  }

}
