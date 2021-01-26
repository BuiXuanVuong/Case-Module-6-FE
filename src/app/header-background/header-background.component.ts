import { Component, OnInit } from '@angular/core';
import {Iuser} from '../model/iuser';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {StatusService} from '../service/status.service';
import {AuthService} from '../auth.service';
import {LikeService} from '../service/like.service';
import {AccountService} from '../service/account.service';
import {IAccount} from '../model/iaccount';

@Component({
  selector: 'app-header-background',
  templateUrl: './header-background.component.html',
  styleUrls: ['./header-background.component.css']
})
export class HeaderBackgroundComponent implements OnInit {

  public userName: any;
  public userNamePath: any;
  // @ts-ignore
  public userPath: Iuser;
  // @ts-ignore
  public userLogin: Iuser;


  constructor(private statusService: StatusService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService,
              private accountService: AccountService) {

    // @ts-ignore
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



    console.log('name path: ' + this.userNamePath);
    if (this.userNamePath) {
      this.userName = this.userNamePath;
    } else {
      this.userName = auth.currentUserValue.userName;
    }
  }
  ngOnInit(): void {
  }


  listFriends() {
    this.router.navigate(['list-friend', this.userName]);
  }

  profile() {
    this.router.navigate(['about', this.userName]);
  }

  clickGoToTimeLine() {
    // @ts-ignore
    // this.statusService.getAllStatus(this.auth.currentUserValue.userName).subscribe( data => {
    this.router.navigate(['timeline', this.userName]);

  }

}
