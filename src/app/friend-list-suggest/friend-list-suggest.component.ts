import { Component, OnInit } from '@angular/core';
import {AccountService} from '../service/account.service';
import {Router} from '@angular/router';
import {IAccount} from '../model/iaccount';


@Component({
  selector: 'app-friend-list-suggest',
  templateUrl: './friend-list-suggest.component.html',
  styleUrls: ['./friend-list-suggest.component.css']
})
export class FriendListSuggestComponent implements OnInit {
  public username: any;
  // @ts-ignore
  friendListSuggest: IAccount[];

  constructor(private accountService: AccountService,
              private router: Router) {}

  ngOnInit(): void {
    // @ts-ignore
    this.getAccountListSuggest(this.username);
  }


  private getAccountListSuggest(username: any) {
    // @ts-ignore
    this.accountService.getAccountListSuggest(username).subscribe(data => {
      // @ts-ignore
      this.friendListSuggest = data;
    });
  }

  sentRequestFriend() {
    this.accountService.requestFriend().subscribe(data => {
      console.log('OK');
    });
  }




}
