import { Component, OnInit } from '@angular/core';
import {AccountService} from '../service/account.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {IAccount} from '../model/iaccount';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public userNameLogin: any;
  // @ts-ignore
  currentAccount: IAccount;
  // @ts-ignore
  sub: Subscription;
  email = '';
  name = '';
  password = '';
  phone = '';
  birthday = '';
  image = '';
  avatarUrl = '';
  // @ts-ignore
  updateForm: FormGroup;

  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService,
              private db: AngularFireDatabase) { }



  ngOnInit(): void {
    // @ts-ignore
    this.getLoginAccount();
    this.updateForm = this.fb.group({
      email: [''],
      // password: [''],
      birthday: [''],
      phone: ['']
    });
    this.accountService.getUserPathByUserName(this.auth.currentUserValue.userName).subscribe(data => {
      this.currentAccount = data;
      this.updateForm.patchValue(this.currentAccount);
      });

    this.updateForm.patchValue(this.currentAccount);
  }
  getLoginAccount(): any{
    const loginUser = this.accountService.getUserPathByUserName(this.auth.currentUserValue.userName).subscribe(data => {
      this.currentAccount = data;
      console.log(this.currentAccount);
    });
    return loginUser;
  }
  searchAddFriend() {
    this.router.navigate(['friend-list-suggest', this.userNameLogin]);
  }

  waitInvitation() {
    this.router.navigate(['invite-friend', this.userNameLogin]);
  }

  listFriends() {
    this.router.navigate(['list-friend', this.userNameLogin]);

  }

  updateUser() {
    if (this.updateForm.valid) {
      const {value} = this.updateForm;
      const data = {
        ...this.currentAccount,
        ...value
      };
      this.accountService.updateUserProfile(this.currentAccount.id, data).subscribe(result => {
          alert('Update successfully!');
        }, error => {
          console.log(error);
        }
      );
    }
  }
}
