import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
// import {TokenStorageService} from '../service/token-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IAccount} from '../model/iaccount';
import {AuthenService} from '../service/authen.service';
import {AccountService} from '../service/account.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage = '';
  // @ts-ignore
  registerForm: FormGroup;
  isRegisterFail = false;

  constructor(private accountService: AccountService,
              private formBuilder: FormBuilder,
              private router: Router,
              private authenService: AuthenService,
              ){ }

  ngOnInit(): void {
    if (this.authenService.isLogin()){
      alert('Bạn đã Đăng Nhập');
      this.router.navigate(['login']);
    }
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }


  submitRegister() {
    const newAccount: IAccount = this.registerForm.value;
    console.log(newAccount);
    this.accountService.createAccount(newAccount).subscribe(
        (data) => {
          // @ts-ignore
          // tslint:disable-next-line:triple-equals
            this.router.navigate(['login']);
          }, () => {
          console.log('Đăng kí không thành công');
        }
      );
  }

  get userName(){
    return this.registerForm.get('userName');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }




}
