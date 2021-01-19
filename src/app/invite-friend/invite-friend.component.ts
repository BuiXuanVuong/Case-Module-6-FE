import { Component, OnInit } from '@angular/core';
import {AccountService} from '../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IAccount} from '../model/iaccount';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-invite-friend',
  templateUrl: './invite-friend.component.html',
  styleUrls: ['./invite-friend.component.css']
})
export class InviteFriendComponent implements OnInit {

  public id = 0;
  // @ts-ignore
  friendListSuggest: IAccount[];
  constructor(private accountService: AccountService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.id = +this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.getListInvite(this.auth.currentUserValue.userName);
  }

  acceptInvitation(userName: string, idPost: number) {
    this.accountService.acceptFriend(userName, idPost).subscribe(data => {
      alert('Bạn đã đồng ý kết bạn');
    });
  }

  private getListInvite(userName: string) {
    // @ts-ignore
    this.accountService.getListInvite(this.auth.currentUserValue.userName).subscribe(data => {
      // @ts-ignore
      this.friendListSuggest = data;
    });
  }

}
