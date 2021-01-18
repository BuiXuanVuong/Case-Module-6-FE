import { Component, OnInit } from '@angular/core';
import {AccountService} from '../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IAccount} from '../model/iaccount';

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
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getListInvite(this.id);
  }

  acceptInvitation(idGet: number, idPost: number) {
    this.accountService.acceptFriend(idGet, idPost).subscribe(data => {
      alert('Bạn đã đồng ý kết bạn');
    });
  }

  private getListInvite(id: number) {
    // @ts-ignore
    this.accountService.getListInvite(this.id).subscribe(data => {
      // @ts-ignore
      this.friendListSuggest = data;
    });
  }

}
