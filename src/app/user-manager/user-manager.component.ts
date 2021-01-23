import { Component, OnInit } from '@angular/core';
import {IAccount} from '../model/iaccount';
import {AuthService} from '../auth.service';
import {AdminService} from '../service/admin.service';
import {AccountService} from '../service/account.service';
import {TokenStorageService} from '../service/token-storage.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  // @ts-ignore
  term: string;
  // @ts-ignore
  username: '';

  // @ts-ignore
  users: IAccount[];
  // @ts-ignore
  records: number;
  page = 1;
  // @ts-ignore
  blockId: number;
  sumUsers = 0;


  constructor(private adminService: AdminService,
              private authService: AuthService,
              private accountService: AccountService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    this.adminService.getAllUser().subscribe(data => {
      this.users = data;
      this.records = data.length;
    }, error => {
      console.log(error);
    });
  }

  blockUser(user: IAccount, userId: number): void {
    user.isNonBanned = true;
    if (confirm('Do you really want to block this user?')) {
      this.adminService.blockActiveUser( userId, user).subscribe(result => {
        console.log('block ok');
        // this.adminService.getAllUser().subscribe(result2 => {
        //   this.users = result2;
        // });
      }, error => console.log(error));
    }
  }

  activeUser(user: IAccount, userId: number): void {
    user.isNonBanned = false;
    if (confirm('Do you really want to unblock this user?')) {
      this.adminService.unBlockActiveUser(userId, user).subscribe(result => {
        console.log('active ok');
        //  this.adminService.getAllUser().subscribe(result1 => {
        //   this.users = result1;
        // });
      }, error => console.log(error));
    }
  }

  onSubmit(form: NgForm) {

      this.accountService.findUserByUserName(form.value.userName).subscribe(
        response => {
          this.users = response as IAccount[];
          this.sumUsers = this.users.length;
        },
        error => console.error(error)
      );

      form.reset(
      {
        userName: ''
      });
  }



}
