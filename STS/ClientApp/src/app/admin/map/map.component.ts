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

  

  constructor(private router: Router) { }

  ngOnInit() {
   
  }

  
}
