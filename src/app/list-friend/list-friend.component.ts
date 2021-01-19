import { Component, OnInit } from '@angular/core';
import {AccountService} from '../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IAccount} from '../model/iaccount';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.css']
})
export class ListFriendComponent implements OnInit {

  public id = 0;
  // @ts-ignore
  listFriend: IAccount[];
  constructor(private accountService: AccountService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.id = +this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.getListFriends(this.auth.currentUserValue.userName);
  }

  getListFriends(id: number) {
    // @ts-ignore
    this.accountService.getListFriends(this.auth.currentUserValue.userName).subscribe(data => {
      this.listFriend = data;
    });
  }

}
