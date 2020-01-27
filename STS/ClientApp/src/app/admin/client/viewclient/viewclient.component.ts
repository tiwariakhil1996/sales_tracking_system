import { Component, OnInit } from '@angular/core';
import { clientModel } from '../../../model/model';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewclient',
  templateUrl: './viewclient.component.html',
  styleUrls: ['./viewclient.component.css']
})
export class ViewclientComponent implements OnInit {


  client = new clientModel();
  clientDetails: clientModel[] = [];

  constructor(private router: Router, private clientService: CommonService, private modalService: NgbModal) {
    this.clientList();


  }
  ngOnInit() {
  }



  // Display

  clientList() {
    this.clientService.clientList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.ClientList) {
          this.clientDetails = data.ClientList;
        }
      }
    }, (err) => {

    });
  }

  // Edit
  openupdatemodal(content, item) {
    this.client = item;
    // data show in model use this line and store the data in user and display in ui
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });

  }

  onEdit(id:number) {
    // this.client.image = this.imageSrc;
    this.clientService.updateClient(id, this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Client updated sucesfully');
      }
      this.client = new clientModel();
      this.clientList();
    }, (err) => {
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.clientService.deleteClient(id).subscribe(data => {
        this.clientService.clientList();
        this.clientList();
      });
    }
  }


}
