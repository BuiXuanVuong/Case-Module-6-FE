import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import {TokenStorageService} from '../service/token-storage.service';
import {AuthenService} from '../service/authen.service';
// @ts-ignore
import {IAccount} from '../model/Iaccount';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });
  // @ts-ignore
  returnUrl: string;
  error = '';
  loading = false;
  submitted = false;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['timeline']);
    }
  }


  ngOnInit() {

  createSubmit(): void{
    const account: IAccount = this.loginAccountForm.value;
    this.authService.login(account).subscribe(
      data => {
        console.log(data);
        // tslint:disable-next-line:triple-equals

        if (data.message == 'Login success'){
          this.isLoggedIn = true;
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveAccount(data.account_id);
          this.router.navigate(['timeline']);

          // tslint:disable-next-line:triple-equals
      },
      (error) => {
        console.log('ko được');
      }
    );
  }

  login() {
    this.submitted = true;
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.userName, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          localStorage.setItem('ACCESS_TOKEN', data.accessToken);
          this.router.navigate(['timeline']);
        },
        error => {
          this.error = 'Sai tên đăng nhập hoặc mật khẩu';
          this.loading = false;
        });
  }



}
