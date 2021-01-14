import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TokenStorageService} from '../service/token-storage.service';
import {AuthenService} from '../service/authen.service';
// @ts-ignore
import {IAccount} from '../model/Iaccount';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  loginAccountForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  // accountEmail = this.tokenStorage.getAccount();

  constructor(private authService: AuthenService,
              private tokenStorage: TokenStorageService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()){
      this.isLoggedIn = true;

    }
    this.loginAccountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

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
          this.router.navigate(['/']);
          // tslint:disable-next-line:triple-equals
        }else if (data.message == 'Email hoặc mật khẩu không đúng'){
          this.isLoginFailed = true;
          this.errorMessage = data.message;
        }

      },
      (error) => {
        this.isLoginFailed = true;
        this.errorMessage = error.message;
      }
    );
  }

  logOut() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  get email(){
    return this.loginAccountForm.get('email');
  }

  get password(){
    return this.loginAccountForm.get('password');
  }

}
