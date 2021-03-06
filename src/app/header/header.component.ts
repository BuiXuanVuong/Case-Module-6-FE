import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../service/token-storage.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {AccountService} from '../service/account.service';
import {User} from '../user';
import {Iuser} from '../model/iuser';
import {first} from 'rxjs/operators';
import {StatusService} from '../service/status.service';
import {IStatus} from '../model/istatus';
import {IAccount} from '../model/iaccount';
import {Message} from '../model/message';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userLogin: Iuser | undefined;
  public userPath: Iuser | undefined;

  // @ts-ignore
  keyword: string;

  // @ts-ignore
  userNameLogin: string;

  // @ts-ignore
  statuses: IStatus[];

  // @ts-ignore
  friendListSuggest: IAccount[];

  messages: Message[] | undefined;

  constructor(private route: Router,
              private auth: AuthService,
              private accountService: AccountService,
              private router: ActivatedRoute,
              private statusService: StatusService,
              private authService: AuthService,
              private messageService: MessageService
              ) {
    // @ts-ignore
    this.userNameLogin = this.auth.currentUserValue.userName;
    this.router.paramMap.subscribe((paraMap: ParamMap) => {
      console.log(paraMap.get('userName'));
      // @ts-ignore
      accountService.getUserPathByUserName(this.userPath).subscribe(data => {
        this.userPath = data;
      });
    });

   // @ts-ignore
    accountService.getUserLoginByUserName(auth.currentUserValue.userName).subscribe(data => {
      console.log('ok', data);
      this.userLogin = data;

    });

    // @ts-ignore
    this.messageService.getMessageList().subscribe(data => {
      this.messages = data;
    });

    // @ts-ignore
    this.accountService.getListInvite(this.auth.currentUserValue.userName).subscribe(data => {
      // @ts-ignore
      this.friendListSuggest = data;
    });

  }


  clickGoToTimeLine() {
    // @ts-ignore
    // this.statusService.getAllStatus(this.auth.currentUserValue.userName).subscribe( data => {
      this.route.navigate(['timeline', this.userNameLogin]);
      console.log('click go to time line' + this.userNameLogin);
    // });
  }

  ngOnInit(): void {

  }
  logout() {
    this.auth.logout();
    this.route.navigate(['/login']);
  }

  private goToSearch() {
    this.route.navigate(['friend-list-suggest', this.userNameLogin]);
    this.accountService.changeKeyword(this.keyword);
  }

}
