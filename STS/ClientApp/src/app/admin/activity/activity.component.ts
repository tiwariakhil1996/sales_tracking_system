import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})



export class ActivityComponent implements OnInit {

  RoleJason = {
    ROle: [0, 1],
    Component: 'ActivityComponent'
    };

  constructor( private router: Router) { 

    }

  ngOnInit() {
    this.checkRole(this.RoleJason);
  }


  checkRole(RoleJason) {
    const result = JSON.parse(localStorage.getItem('adminLogin')) || [];
    if (this.RoleJason.Component === RoleJason.Component) {
      // console.log(result);
      if (!this.RoleJason.ROle.includes(result.userType)) {
        this.router.navigate(['admin/login']);
      }
    }
  }


}
