import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../service/token-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IAccount} from '../model/iaccount';
import {AccountNofiticationService} from '../service/nofitication/account-nofitication.service';
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
  confirmPassword = '';
  isRegisterFail = false;


  constructor(private router: Router,
              private accountService: AccountService,
              private formBuilder: FormBuilder,
              private authService: AuthenService,
              private tokenStorage: TokenStorageService,
              private notificationService: AccountNofiticationService) { }

  ngOnInit(): void {
    if (this.authService.isLogin()){
      alert('Bạn đã Đăng Nhập');
      this.router.navigate(['login']);
    }
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  submitRegister() {
    const newAccount: IAccount = this.registerForm.value;
    // tslint:disable-next-line:triple-equals
    if (this.confirmPassword == newAccount.password){
      this.accountService.createAccount(newAccount).subscribe(
        (data) => {
          // tslint:disable-next-line:triple-equals
          if (data.message == 'Đăng ký thành công'){
            alert('Đăng ký thành công');
            this.router.navigate(['login']);
          }else {
            this.errorMessage = data.message;

          }
          this.isRegisterFail = true;


          console.log(data); },
        () => {
          // @ts-ignore
          this.notificationService.fail('Đăng ký không thành công');
        }
      );
    }else {
      // @ts-ignore
      this.notificationService.fail('Mật khẩu không khớp');
    }

  }

  get name(){
    return this.registerForm.get('name');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }


}
