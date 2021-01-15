import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenService} from '../service/authen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(private router: Router,
              private authService: AuthenService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.authService.isLogin()){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
