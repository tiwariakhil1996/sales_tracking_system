import { routes } from './../app/app.routing';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


export class AuthGuard implements CanActivate {
    authInfo$: any;

    constructor(
        private router: Router,
        private authservice: AuthGuard
    ) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.authservice.authInfo$
            .map(authInfo => authInfo.isLoggedIn())
            .take(1)
            .do(allowed =>{
                
            if (!allowed) {
                this.router.navigate(['/sales/login/']);
            }
        });

    }
}