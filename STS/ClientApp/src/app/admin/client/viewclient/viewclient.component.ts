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

  openBackDropCustomClass() {

  }

  // oDelete(id: number) {
  //   if (confirm('Are you sure to delete this record ?') == true) {
  //     this.clientService.deleteClient(id)
  //     .subscribe(x => {
  //       this.clientService.deleteClient(id);
  //     alert("Deleted Successfully");
  //     })
  //   }
  // }

  // Delete
  // onDelete(id){
  //   this.clientService.deleteClient(this.client).subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       const obj = this.clientDetails.find(item => item.id == this.client.id);
  //       if (!obj) {
  //         alert('Record deleted Successfully');
  //       }
  //       else {
  //         alert('Record cant be deleted');
  //       }
  //     }
  //   }, (err) => {
  //   });
  // }

  onDelete(id: number) {

    // const i = this.clientDetails.findIndex(item => item.id == this.client.id);
    //     // if (i!==-1) {
    //     //   this.clientDetails.splice(i,1);
    //     // }
    if (confirm('Are you sure to delete this record ?') === true) {
      this.clientService.deleteClient(id).subscribe(data => {
        this.clientService.clientList();

      });
    }
  }

  deleteClient(id: number) {
    this.clientService.deleteClient(id).subscribe(data => {
          console.log(data);
          this.clientList();
        },
        error => console.log(error));
  }

//   deleteUser(id: number) {
//     this.clientService.deleteClient(id).pipe(first()).subscribe(() => { 
//         this.clientList() 
//     });
// }

}
