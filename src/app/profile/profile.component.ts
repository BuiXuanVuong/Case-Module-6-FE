import { Component, OnInit } from '@angular/core';
import {IAccount} from '../model/iaccount';
import {Subscription} from 'rxjs';
import {AccountService} from '../service/account.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // @ts-ignore
  currentAccount: IAccount;
  // @ts-ignore
  sub: Subscription;
  email = '';
  name = '';
  password = '';
  phone = '';
  birthday = '';
  arrayPicture = '';

  constructor(private accountService: AccountService,
              private router: Router,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private activatedRoute: ActivatedRoute) { }
  userForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
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
  getAccountProfile(){
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.getUserProfileById(id);
    });
  }
  private getUserProfileById(id: any) {
    this.accountService.getAccountProfile(id).subscribe(value => {
      this.currentAccount = value;

      // @ts-ignore
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
}
