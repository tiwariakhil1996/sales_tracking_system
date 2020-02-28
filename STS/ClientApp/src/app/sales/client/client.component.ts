import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  RoleJason = {
    ROle: [0, 1],
    Component: "ClientComponent"
  }

  constructor(private router:Router) {
  }

  ngOnInit() {
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
