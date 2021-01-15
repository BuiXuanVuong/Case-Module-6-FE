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

  // @ts-ignore
  friendListSuggest: IAccount[];

  constructor(private accountService: AccountService,
              private router: Router) {}

  ngOnInit(): void {
    this.getAccountListSuggest();
  }

  private getAccountListSuggest() {
    // @ts-ignore
    this.accountService.getAccountListSuggest().subscribe(data => {
      // @ts-ignore
      this.friendListSuggest = data;
    });
  }

}
