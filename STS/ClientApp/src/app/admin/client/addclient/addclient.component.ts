import { Component, OnInit } from '@angular/core';
import { clientModel, countryModel, stateModel, cityModel } from '../../../model/model';
import { Router } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { CountriesService } from '../../../service/countries.service';
import { SelectService } from '../../../service/select.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {


  countryInfo: any[] = [];
  stateInfo: any[] = [];
  cityInfo: any[] = [];

  client = new clientModel();
  clientDetails: clientModel[] = [];

  country = new countryModel();
  countryDetails: countryModel[] = [];

  state = new stateModel();
  stateDetails: stateModel[] = [];

  city = new cityModel();
  cityDetails: cityModel[] = [];


  constructor(private router: Router, private toastr: ToastrService, private clientService: CommonService, private selectService: SelectService) {

    this.countryList();

  }
  ngOnInit() {

  }


  submitForm() {

    let strError = '';

    if (!this.client.clientName) {
      strError += strError = '- Please enter clientname';
    }
    else
    if (!this.validateName(this.client.clientName)) {
      strError += strError = '' ? '' : '<br/>';
      strError += strError = '- Client name should only contain alphabets';
    }

    if (!this.client.email) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter valid email id';
    }
    else {
      if (!this.validateEmail(this.client.email)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Email should contain @ and . ';
      }
    }

    if (!this.client.contact) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter valid mobile no.';
    }
    else {
      if (!this.validateMobile(this.client.contact)) {
        strError += strError = '' ? '' : '<br/>';
        strError += strError = '- Mobile no should be of 10 digits';
      }
    }
  
    if (!this.client.gender) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select gender';
    }

    if (!this.client.address) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter address';
    }

    if (!this.client.street) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter street';
    }

    if (!this.client.cid) {
      strError += strError = '' ? '' : '<br/>';
      strError += strError = '- Please select country';
    }
    else
    if (!this.client.sid) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select state';
    }else
    if (!this.client.cityid) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please select city';
    }

    if (!this.client.postalCode) {
      strError += strError = '' ? '' : '<br/>';
      strError += '- Please enter postalcode';
    }

    if (strError !== '') {
      this.toastr.warning(strError, 'Warning', {
        disableTimeOut: false,
        timeOut: 2000,
        enableHtml: true,
        progressBar: true,
        closeButton: true,
      });
      return false;
    }
  

    this.clientService.addClient(this.client).subscribe((data: any) => {
      if (data.Status.code === 0) {
        // alert('Registered sucesfully');
        this.toastr.success('Client added sucesfully', 'Successful', {
          disableTimeOut: false
        });
        this.client = new clientModel();
      }
      else {
        // alert("Not Matched");
        this.toastr.info('This email id is already registered', 'Info', {
          disableTimeOut: false,
          timeOut: 2000
        });
      }
    }, (err) => {


    });
  }


  firstnameValidation() {
    let isValid = false;
    if (!this.validateName(this.client.clientName)) {
      isValid = true;
    }
    ;

    if (isValid) {
      this.toastr.warning('Please enter clientname correctly', 'Warning', {
        disableTimeOut: false,
        timeOut: 2000
      });
    }

  }

  

  validateName(nameField) {
    var reg = /^[A-Za-z]+$/;
    return reg.test(nameField) == false ? false : true;
  }

// Email Validation

checkEmailValidation() {
  let isValid = false;
  if (!this.validateEmail(this.client.email)) {
    // alert('Please enter valid email.')
    // this.errorMessage="Please enter valid email";
    //  return false;
    isValid = true;
  }
  ;
  if (isValid) {
    this.toastr.warning('Please enter valid email id', 'Warning', {
      disableTimeOut: false,
      timeOut: 2000
    });
  }

}

validateEmail(emailField) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(emailField) == false ? false : true;
}

// Mobile no.  Validation

mobValidation() {
  let isValid = false;
  if (!this.validateMobile(this.client.contact)) {
   
    isValid = true;
  }
  ;
  if (isValid) {
    this.toastr.warning('Please enter valid mobile number', 'Warning', {
      disableTimeOut: false,
      timeOut: 2000
    });
  }
}

validateMobile(mobileField) {
  var reg = /^\d{10}$/;
  return reg.test(mobileField) == false ? false : true;
}


  countryList() {
    this.clientService.countryList().subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CountryList) {
          this.countryDetails = data.CountryList;

        }
      }
    }, (err) => {

      console.log(err);
    });
  }


  onCountryChange(cid) {
    this.stateList(cid);


  }

  onStatechange(sid) {
    this.cityList(sid);
  }

  stateList(cnid) {
    this.clientService.stateList(cnid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.StateList) {
          this.stateDetails = data.StateList;
        }
      }
    }, (err) => {

      console.log(err);
    });
  }

  cityList(stid) {
    this.clientService.cityList(stid).subscribe((data: any) => {
      if (data.Status.code === 0) {
        if (data.CityList) {
          this.cityDetails = data.CityList;
        }
      }
    }, (err) => {

      console.log(err);
    });
  }


  viewClientForm(){
    this.router.navigate(['/admin/client/viewclient']);

  }
}
