import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  RoleJason = {
    ROle: [0, 1],
    Component: "MapComponent"
  }

constructor(private router:Router) {
  
}

  public show:boolean = false;
  public buttonName:any = 'Show';

  ngOnInit () { 
    this.checkRole(this.RoleJason)
   }

   
  checkRole(RoleJason) {
    var result = JSON.parse(localStorage.getItem('salesLogin')) || [];
    if (this.RoleJason.Component == RoleJason.Component) {
      console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['sales/login']);
      }
    }
  }

 
}