

import { Component, OnInit } from '@angular/core';
import { clientModel } from '../../../model/model';
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


  // selectedCountry: Country = new Country(2, 'Brazil');
  // selectedState: State = new State(8,3, 'Gujarat');
  // countries: Country[];
  // States: State[];
  // Cities: City[];
  
  constructor(private router: Router, private clientService: CommonService, private modalService: NgbModal) {
    this.clientList();


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
    }, (err) => { console.log(err); });
  }

  // Edit
  openupdatemodal(content, item) {
    this.client = JSON.parse(JSON.stringify(item));
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });

  }
  onEdit(id: number) {
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
    if (confirm('Are you sure to delete this record ?') === true) {
      this.clientService.deleteClient(id).subscribe(data => {
        this.clientService.clientList();
        this.clientList();
      });
    }
  }



// onSelect(cid) {
//     this.stateDetails = this.clientService.stateList().filter((item) => item.cid == cid);
//   }

//   onState(stateid) {
//     this.cities = this.clientService.cityList().filter((item) => item.stateid == stateid);
//   }


}
