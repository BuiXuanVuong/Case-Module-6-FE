import {Component, OnInit} from '@angular/core';
import {AdminService} from '../service/admin.service';
import {AuthService} from '../auth.service';
import {IAccount} from '../model/iaccount';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  // @ts-ignore
  users: IAccount[];
  // @ts-ignore
  records: number;
  page = 1;
  // @ts-ignore
  blockId: number;
  // @ts-ignore
  keyword: string;
  constructor(private adminService: AdminService,
              private authService: AuthService) { }
  ngOnInit(): void {
    this.getAllUser();
  }
  getAllUser(){
    this.adminService.getAllUser().subscribe(data => {
      this.users = data;
      this.records = data.length;
    }, error => {
      console.log(error);
    });
  }
  blockUser(user: IAccount, userId: number): void {
    // @ts-ignore
    user.status = 0;
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
    // @ts-ignore
    user.status = 1;
    if (confirm('Do you really want to unblock this user?')) {
      this.adminService.unBlockActiveUser(userId, user).subscribe(result => {
        console.log('active ok');
        //  this.adminService.getAllUser().subscribe(result1 => {
        //   this.users = result1;
        // });
      }, error => console.log(error));
    }
  }
  search(){
    this.adminService.searchUser(this.keyword).subscribe(data => {
      this.users = data;
      this.records = data.length;
    }, error => {
      console.log(error);
    });
  }
}

