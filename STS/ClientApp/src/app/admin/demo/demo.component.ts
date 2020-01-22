import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../service/demo.service';
import { demoModel } from '../../model/model';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {


  RegisterUserDetail = new demoModel();
  userDetails: demoModel[] = [];

  constructor(private demoService: DemoService) {
    this.getRegister();


  }

  ngOnInit() {
  }

  demoRegister() {

    this.demoService.registerService(this.RegisterUserDetail).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('data sucesfully add');
      }
    }, (err) => {


    });
  }

  getRegister() {
    // this.demoService.RegisterList().subscribe((data: any) => {
    this.demoService.getregisterList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.getregisterList) {
          this.userDetails = data.getregisterList;
        }
      }
    }, (err) => {


    });
  }


}
