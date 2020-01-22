import { Component, OnInit } from '@angular/core';
import { clientModel } from '../../../model/model';
import { Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {

  client = new clientModel();

  clientDetails: clientModel[] = [];
  constructor(private router: Router, private clientService: CommonService){
    // this.Login();


  }
  ngOnInit() {
  }

  submitForm() {

    this.clientService.addClient(this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Registered sucesfully');
      }
    }, (err) => {


    });
  } 

}
