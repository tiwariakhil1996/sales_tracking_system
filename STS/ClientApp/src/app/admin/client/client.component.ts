import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { clientModel } from '../../model/model';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  constructor()
  {}


  ngOnInit() {
  }

  // client = new clientModel();

  // clientDetails: clientModel[] = [];
  // constructor(private router: Router, private clientService: CommonService){
  //   // this.Login();


  // }
  

  // submitForm() {

  //   this.clientService.addClient(this.client).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       alert('Registered sucesfully');
  //     }
  //   }, (err) => {


  //   });
  // } 

}
