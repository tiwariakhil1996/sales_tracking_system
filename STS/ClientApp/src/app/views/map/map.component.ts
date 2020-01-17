import { Component, OnInit } from '@angular/core';
import { registerModel } from '../model/model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    // ngOnInit(): void {
    //     throw new Error("Method not implemented.");
    // }

  title = 'STS';
  RegisterUserDetail = new registerModel();

  userDetails: registerModel[] = [];
  constructor(private userService: UserService) {
    this.getRegister();


  }

  ngOnInit() {
  }

  getRegister() {
    this.userService.RegisterList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.RegisterList) {
          this.userDetails = data.RegisterList;
        }
      }
    }, (err) => {


    });
  }

  addRegister() {

    this.userService.addRegister(this.RegisterUserDetail).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert("data sucesfully add");
      }
    }, (err) => {


    });


  }

 

}
