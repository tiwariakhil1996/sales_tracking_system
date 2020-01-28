import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
 

  // url :string = "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";

  private url = 'assets/Countries.json';
  
  allCountries(): Observable<any> {
    return this.http.get(this.url);
  }

  constructor(private http:HttpClient) { 
    this.allCountries().subscribe(data => {
      console.log(data);
     });
  }

}
