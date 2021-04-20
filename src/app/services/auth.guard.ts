import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './authentication.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private autheService: AuthService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.autheService.userIsLogged()) {
            // user is logged in
            return true;
        }

        // user is NOT logged in, redirect to login page
        this.router.navigate(['/login'], { queryParams: { promptLogin: true }});
        return false;
    }
}