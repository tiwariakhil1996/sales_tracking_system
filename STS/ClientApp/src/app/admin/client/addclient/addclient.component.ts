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
  constructor(private router: Router, private clientService: CommonService) {
    // this.Login();


  }
  ngOnInit() {
  }


  // changeCountry(count) {
  //   this.clientService.clientList().subscribe((data: any) => {
  //     if (data.Status.code === 0) {
  //       if (data.ClientList) {
  //         this.clientDetails = data.ClientList;
  //       }
  //     }
  //   }, (err) => {

  //   });
  // }

  submitForm() {

    this.clientService.addClient(this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        alert('Registered sucesfully');
      }
      this.client = new clientModel();
    }, (err) => {


    });
  }

  // resetForm(form?: NgForm) {
  //   if (form != null)
  //     form.reset();
  //   this.employeeService.selectedEmployee = {
  //     EmployeeID: null,
  //     FirstName: '',
  //     LastName: '',
  //     EmpCode: '',
  //     Position: '',
  //     Office: ''
  //   }
  // }

}
