import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SalesService } from './sales.service';


@Injectable({
  providedIn: 'root'
})
export class SalesGuard implements CanActivate {

  constructor(private salesservice: SalesService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.salesservice.isSalesRights()) {
      return true;
    } else {
      // alert(" Login please ");
      this.router.navigate(['/sales/login']);
    }
  }
}
  
