import { Component, OnInit } from '@angular/core';
// import { SelectService } from '../../service/select.service';
// import { Country } from '../../service/country';
// import { State } from '../../service/state';
// import { City } from '../../service/city';
import { Router } from '@angular/router';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // selectedCountry: Country = new Country(2, 'Brazil');
  // selectedState: State = new State(8,3, 'Gujarat');
  // countries: Country[];
  // states: State[];
  // cities: City[];

  constructor(private router: Router) { }

  ngOnInit() {
    // this.countries = this.selectService.getCountries();
    // this.onSelect(this.selectedCountry.id);
    // this.states = this.selectService.getStates();
    // this.onState(this.selectedState.id);
  }

  // onSelect(countryid) {
  //   this.states = this.selectService.getStates().filter((item) => item.countryid == countryid);
  // }

  // onState(stateid) {
  //   this.cities = this.selectService.getCities().filter((item) => item.stateid == stateid);
  // }
}
