import { Component, OnInit } from '@angular/core';
import {AccountService} from '../service/account.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {IAccount} from '../model/iaccount';
import {AuthService} from '../auth.service';
import {IStatus} from '../model/istatus';
import {StatusService} from '../service/status.service';
import {Iuser} from '../model/iuser';
import {LikeService} from '../service/like.service';

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.css']
})



export class ListFriendComponent implements OnInit {

  // @ts-ignore
  public userPath: Iuser;
// @ts-ignore
  public userLogin: Iuser;
  public userName: any;
  public userNamePath: any;
  public id = 0;
  // @ts-ignore
  listFriend: IAccount[];
  // @ts-ignore
  statuses: IStatus[];
  constructor(private accountService: AccountService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService,
              private statusService: StatusService) {

      this.userNamePath = this.route.snapshot.params.userNamePath;

    //
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      console.log(paraMap.get('userName'));
      // @ts-ignore
      accountService.getUserPathByUserName(this.userNamePath).subscribe(data => {
        this.userPath = data;
      });

      accountService.getUserPathByUserName(this.auth.currentUserValue.userName).subscribe( data => {
        this.userLogin = data;
      });

    });

  }

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

  watchWallFriend(userNameFriend: string) {
    this.router.navigate(['timeline', userNameFriend]);
    console.log(userNameFriend);
  }


  private back() {
    this.router.navigate(['timeline', this.auth.currentUserValue.userName]);
  }

  sendMessage(userFriend: any) {
    this.router.navigate(['create-message', userFriend]);
  }
}



