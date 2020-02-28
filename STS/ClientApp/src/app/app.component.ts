import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { MouseEvent } from "@agm/core";

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // RoleJason = {
  //   ROle: [0, 1],
  //   Component: "DashboardComponent,ActivityComponent,ProductComponent,ClientComponent,RegisterComponent,MapComponent,SalesdataComponent,ForgotPasswordComponent,CategorySubcategoryComponent"
  // }

  constructor() { }

  ngOnInit() {

    // this.checkRole(this.RoleJason)
  }

  // checkRole(RoleJason) {
  //   var result = JSON.parse(localStorage.getItem('adminLogin')) || [];
  //   if (this.RoleJason.Component == RoleJason.Component) {
  //     console.log(result);
  //     if (!this.RoleJason.ROle.includes(result.userType)) {
  //       this.router.navigate(['admin/login']);
  //     }
  //   }
  // }


}

