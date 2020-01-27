import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
 

  // url :string = "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";

  private _jsonURL = 'assets/Countries.json';
  
  getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  constructor(private http:HttpClient) { 
    this.getJSON().subscribe(data => {
      console.log(data);
     });
  }

  // allCountries(): Observable<any>{
  //   return this.http.get(this.url);
  // }
}
