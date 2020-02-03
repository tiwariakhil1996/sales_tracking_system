import { Component, OnInit } from '@angular/core';
import { clientModel, countryModel, stateModel, cityModel } from '../../../model/model';
import { Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { CountriesService } from '../../../service/countries.service';
import { SelectService } from '../../../service/select.service';
import { State } from '../../../service/state';
import { City } from '../../../service/city';
import { Country } from '../../../service/country';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {


  countryInfo: any[] = [];
  stateInfo: any[] = [];
  cityInfo: any[] = [];

  client = new clientModel();
  clientDetails: clientModel[] = [];

  country= new countryModel();
  countryDetails: countryModel[]=[];

  state= new stateModel();
  stateDetails: stateModel[]=[];

  city = new cityModel();
  cityDetails: cityModel[]=[];

 
  constructor(private router: Router, private clientService: CommonService,private selectService: SelectService) {
    
    this.countryList();
  
  }
  ngOnInit() {
   
  }


  submitForm() {
    this.clientService.addClient(this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Registered sucesfully');
      }
      this.client = new clientModel();
    }, (err) => {


    });
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
        if (data.CityList) {
          this.cityDetails = data.CityList;
        }
      }
    }, (err) => {
      
      console.log(err); 
    });
  }

}
