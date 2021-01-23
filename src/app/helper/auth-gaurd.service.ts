import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenService} from '../service/authen.service';
import {UserToken} from '../user-token';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  // @ts-ignore
  currentUser: UserToken;
  constructor(private router: Router,
              private authService: AuthenService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.currentUser) {
      return true;
    } else {
      this.router.navigate(['/login', '/'], {queryParams: {returnUrl: state.url}});
      return false;
  }
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
      return true;
    } else {
      this.router.navigate(['/login', '/'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
