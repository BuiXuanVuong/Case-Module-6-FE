import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../service/token-storage.service';

import {Router} from '@angular/router';

import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {AccountService} from '../service/account.service';
import {User} from '../user';
import {Iuser} from '../model/iuser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {




  public userLogin: Iuser | undefined;
  public userPath: Iuser | undefined;

  constructor(private route: Router,
              private auth: AuthService,
              private accountService: AccountService,
              private router: ActivatedRoute
              ) {
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

  }


  ngOnInit(): void {

  }
  logout() {
    this.auth.logout();
    this.route.navigate(['/login']);
  }
}
