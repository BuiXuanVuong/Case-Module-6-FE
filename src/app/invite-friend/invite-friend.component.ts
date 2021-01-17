import { Component, OnInit } from '@angular/core';
import {AccountService} from '../service/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-invite-friend',
  templateUrl: './invite-friend.component.html',
  styleUrls: ['./invite-friend.component.css']
})
export class InviteFriendComponent implements OnInit {

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {

  }

  acceptInvitation() {
    this.accountService.acceptFriend().subscribe(data => {
      console.log('OK');
    });
  }

  private getListInvite(username: any) {
    // @ts-ignore
    this.accountService.getListInvite(username).subscribe(data => {
      // @ts-ignore
      this.friendListSuggest = data;
    });
  }

}
