import {Component, OnInit} from '@angular/core';
import {UserToken} from '../user-token';
import {User} from '../user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  currentUser: UserToken;
  user: User = {
    userName: '',
    password: ''
  };
  returnUrl = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
    // @ts-ignore
    this.authService.currentUser.subscribe(value => this.currentUser = value);
  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }

  login() {
    // @ts-ignore
    this.authService.login(this.user.userName, this.user.password)
      .pipe(first())
      .subscribe(data => {
        // this.router.navigate([this.returnUrl]);
        this.router.navigate(['timeline', this.authService.currentUserValue.userName]);
      });
  }

}
