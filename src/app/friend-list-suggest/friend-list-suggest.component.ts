import {Component, OnInit} from '@angular/core';
import {AccountService} from '../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IAccount} from '../model/iaccount';
import {AuthService} from '../auth.service';



@Component({
  selector: 'app-friend-list-suggest',
  templateUrl: './friend-list-suggest.component.html',
  styleUrls: ['./friend-list-suggest.component.css']
})
export class FriendListSuggestComponent implements OnInit {
  public username: any;
  public userName: any;
  public id: any;
  // @ts-ignore
  friendListSuggest: IAccount[];
  // @ts-ignore
  keyword: string;

  constructor(private accountService: AccountService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) {
    // @ts-ignore

  }

  ngOnInit(): void {
    // @ts-ignore
    // this.id = +this.route.snapshot.paramMap.get('userName');

    // @ts-ignore
    // this.userName = this.getAccountListSuggest(this.auth.currentUserValue.userName);
    // console.log(this.userName);
    this.accountService.currentKeyword.subscribe(keyword => this.keyword = keyword);
    this.search();
  }


  private getAccountListSuggest(userName: any) {
    // @ts-ignore
    this.accountService.getAccountListSuggest(userName).subscribe(data => {
      // @ts-ignore
      this.friendListSuggest = data;
    });
  }

  sentRequestFriend(userName: string, idGet: number) {
    // @ts-ignore
    this.accountService.requestFriend(this.auth.currentUserValue.userName, idGet).subscribe(data => {
      alert('Bạn đã gửi lời mời kết bạn đến  user' + idGet);
    });


  }

  private back() {
    this.router.navigate(['timeline', this.auth.currentUserValue.userName]);
  }


  search(){
    // this.accountService.currentKeyword.subscribe(keyword => this.keyword = keyword);
    this.accountService.getSearchAccountListSuggest(this.userName, this.keyword).subscribe(data => {
      this.friendListSuggest = data;
    }, error => {
      console.log(error);
    });
  }


}
