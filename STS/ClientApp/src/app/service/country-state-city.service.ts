import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryStateCityService {

  constructor(private http: HttpClient) { }

  countryList() {
    return this.http.get('/api/Country_State_City/CountryList');
  }

  stateList(cnid) {
    return this.http.get('/api/Country_State_City/StateList/' + cnid);
  }

  cityList(stid) {
    return this.http.get('/api/Country_State_City/CityList/' + stid);
  }


}
