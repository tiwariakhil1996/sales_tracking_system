import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:  Http) { }

  // sendEmail(data) {
  //   return this.http.post('http://localhost:55627/admin/forgot-password/', data)
  //   .map(res => res.json())
  //   .catch(this._errorHandler);
  // }

  // private _errorHandler(error: Response) {
  //   console.error(error);
  //   return Observable.throw(error || 'Server Error')
  // }

}