import { Component, OnInit } from '@angular/core';
import { clientModel } from '../../../model/model';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewclient',
  templateUrl: './viewclient.component.html',
  styleUrls: ['./viewclient.component.css']
})
export class ViewclientComponent implements OnInit {


  client = new clientModel();
  clientDetails: clientModel[] = [];

  constructor(private router: Router, private clientService: CommonService) {
    this.clientList();


  }
  ngOnInit() {
  }

  //Display

  clientList(){
    this.clientService.clientList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ClientList) {
          this.clientDetails = data.ClientList;
        }
      }
    }, (err) => {

    });
  }

  //Edit

  openBackDropCustomClass(){

  }


  //Delete
  onDelete(){

  }
}
