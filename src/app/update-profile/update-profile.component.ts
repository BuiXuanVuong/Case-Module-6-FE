import { Component, OnInit } from '@angular/core';
import {IAccount} from '../model/iaccount';
import {Subscription} from 'rxjs';
import {AccountService} from '../service/account.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private accountService: AccountService,
              private router: Router,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private activatedRoute: ActivatedRoute) { }
  // @ts-ignore
  currentAccount: IAccount;
  // @ts-ignore
  sub: Subscription;
  email = '';
  userName = '';
  password = '';
  phone = '';
  birthday = '';
  arrayPicture = '';
  userForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required]),
    birthday: new FormControl('', Validators.required),


  });


  ngOnInit(): void {
    // @ts-ignore
    this.currentAccount = {
      id: 1,
      email: 'a',
      password: 'b'
    };
    this.getAccountProfile();
  }
  getAccountProfile() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.getUserProfileById(id);
    });
  }
  private getUserProfileById(id: any) {
    this.accountService.getAccountProfile(id).subscribe(value => {
      this.currentAccount = value;
      this.email = this.currentAccount.email;
      // @ts-ignore
      this.userName = this.currentAccount.userName;
      this.password = this.password;
      // @ts-ignore
      this.phone = this.currentAccount.phone;
      // @ts-ignore
      this.birthday = this.currentAccount.birthday;
      // @ts-ignore
      this.avatarUrl = this.currentAccount.avatarUrl;
    }, () => {
      console.log('Loi' + this.arrayPicture);
    });
  }
  updateAccountProfile() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      // @ts-ignore
      this.accountService.getAccountProfile(id).subscribe(value => {
        this.currentAccount = value;
        // @ts-ignore
        const user: IAccount = {
          id: this.currentAccount.id,
          email: this.userForm.get('email')?.value,
          password: this.userForm.get('password')?.value,
          userName: this.userForm.get('userName')?.value,
          phone: this.userForm.get('phone')?.value,
          birthday: this.userForm.get('birthday')?.value,
        };
        if (user.email === '') {
          user.email = this.email;
        }
        if (user.password === '') {
          user.password = this.password;
        }
        if (user.userName === '') {
          user.userName = this.userName;
        }
        // @ts-ignore
        if (user.phone === '') {
          // @ts-ignore
          user.phone = this.phone;
        }
        if (user.birthday === '') {
          user.birthday = this.birthday;
        }
        this.accountService.updateUserProfile(this.currentAccount.id, user).subscribe(() => {
          alert('Cap nhat thanh cong');
          this.router.navigate(['/profile' + this.currentAccount.id]);
          console.log(this.currentAccount);
        }, () => {
          console.log('Loi');
        });
      });
    });
  }

}
