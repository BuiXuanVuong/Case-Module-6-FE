import { Component, OnInit } from '@angular/core';
import {IAccount} from '../model/iaccount';
import {AuthService} from '../auth.service';
import {AdminService} from '../service/admin.service';

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


  constructor(private adminService: AdminService,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.adminService.getAllUser().subscribe(data => {
      this.users = data;
      this.records = data.length;
    }, error => {
      console.log(error);
    });
  }

  blockUser(user: IAccount, blockId: number): void {
    user.status = 0;
    if (confirm('Do you really want to block this user?')) {
      this.adminService.blockActiveUser(user, blockId).subscribe(result => {
        console.log('block ok');
        // this.adminService.getAllUser().subscribe(result2 => {
        //   this.users = result2;
        // });
      }, error => console.log(error));
    }
  }

  activeUser(user: IAccount, blockId: number): void {
    user.status = 1;
    if (confirm('Do you really want to unblock this user?')) {
      this.adminService.unBlockActiveUser(user, blockId).subscribe(result => {
        console.log('active ok');
        //  this.adminService.getAllUser().subscribe(result1 => {
        //   this.users = result1;
        // });
      }, error => console.log(error));
    }
  }



}
