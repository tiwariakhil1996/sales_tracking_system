import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor() { }

  isSalesRights(): boolean {
    return true;
  }
}
