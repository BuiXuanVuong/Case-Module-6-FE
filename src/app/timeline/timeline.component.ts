
import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {IAccount} from '../model/iaccount';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
// import {IImage} from '../model/iimage';
// import {TokenStorageService} from '../service/token-storage.service';
import {StatusService} from '../service/status.service';

import {AngularFireStorage} from '@angular/fire/storage';
// @ts-ignore
import {IStatus} from '../model/istatus';
import {finalize} from 'rxjs/operators';
// @ts-ignore
import {StatusReply} from '../model/status-reply';

import {AuthService} from '../auth.service';

import {LikeService} from '../service/like.service';
import {AccountService} from '../service/account.service';
import {Iuser} from '../model/iuser';
import {FriendListSuggestComponent} from '../friend-list-suggest/friend-list-suggest.component';
import {MessageService} from '../service/message.service';
import {Message} from '../model/message';


// @ts-ignore

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {


  public replyStatusForm = new FormGroup({
    statusReplyBody: new FormControl(''),
  });

  public id: any;
  // @ts-ignore
  statuses: IStatus[];
  // @ts-ignore
  friendListSuggest: IAccount[];

  public userName: any;
  public userNamePath: any;
  // @ts-ignore
  accountId: number;
  // @ts-ignore
  statusId: number;
  // @ts-ignore
  currentStatus: IStatus = {
    id: 0,
    content: '',
    images: [],
    totalComments: 0,
    totalLikes: 0,

  };
  totalRecord = 0;
  // @ts-ignore
  public userPath: Iuser;
  // @ts-ignore
  public userLogin: Iuser;

  messages: Message[] | undefined;

  constructor(private statusService: StatusService,
              private router: Router,
              private route: ActivatedRoute,

              private auth: AuthService,

              private likeService: LikeService,
              private accountService: AccountService,
              private messageService: MessageService
              ) {

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
    // @ts-ignore
    this.getStatuses(this.userName);
    this.getAccountListSuggest(this.auth.currentUserValue.userName);
    // @ts-ignore
  }

   getStatuses(userName: any) {
    // @ts-ignore
    this.statusService.getAllStatus(userName).subscribe(data => {
      this.statuses = data;
    });
  }

  // @ts-ignore
  public save( statusId, userName) {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.statusService.addReplyStatus(statusId, this.auth.currentUserValue.userName,  this.createReplyStatus()).subscribe((data) => {
      console.log('OK');
      this.replyStatusForm.reset();
      this.getStatuses(this.userNamePath);
    });
  }

  createReplyStatus() {
    const newReplyStatus = {};
    for (const controlName in this.replyStatusForm.controls) {
      if (controlName) {
        // @ts-ignore
        newReplyStatus[controlName] = this.replyStatusForm.controls[controlName].value;
      }
    }
    return newReplyStatus as StatusReply;
  }

  // @ts-ignore
  deleteStatus(statusId) {
    if (this.userName === this.auth.currentUserValue.userName) {
      // @ts-ignore
      this.statusService.deleteStatus(statusId).subscribe(data => {
        console.log('delete', data);

        this.getStatuses(this.userName);
      });
    }
  }

  // @ts-ignore
  editStatus(statusId) {
    this.router.navigate(['status-edit', statusId]);
  }


  searchAddFriend() {
   this.router.navigate(['friend-list-suggest', this.userName]);

  }

  waitInvitation() {
    this.router.navigate(['invite-friend', this.userName]);
  }

  listFriends() {
    this.router.navigate(['list-friend', this.userName]);
  }

  postWallFriend() {
    this.router.navigate(['status-form', this.userName]);
    console.log('OK');
  }

  likeStatus(statusId: number, userName: string){
    this.likeService.likeStatus(statusId, this.auth.currentUserValue.userName ).subscribe(data => {
      console.log('like status');
      this.getStatuses(this.userName);
    }, error => {
      console.log('Không thể like');
    });
  }

  unlikeStatus(statusId: number, userName: string){
    this.likeService.unlikeStatus(statusId, this.auth.currentUserValue.userName).subscribe(
      data => {
        console.log('Huỷ like thành công');
        this.getStatuses(this.userName);
      }, error => {
        console.log('Không thể huỷ like');
      }
    );
  }

  private getAccountListSuggest(userName: any) {
    // @ts-ignore
    this.accountService.getAccountListSuggest(userName).subscribe(data => {
      // @ts-ignore
      this.friendListSuggest = data;
    });
  }

  sentRequestFriend(userName: string, idGet: number, userNameFriend: string) {
    // @ts-ignore
    this.accountService.requestFriend(this.auth.currentUserValue.userName, idGet).subscribe(data => {
      alert('Bạn đã gửi lời mời kết bạn đến ' + userNameFriend );
    });
  }

  private back(userNameLogin: any) {
    this.router.navigate(['timeline', this.userNamePath]);
  }

  getListMessages() {
    this.router.navigate(['list-message']);
  }

  deleteStatusReply(statusReplyId: number){
    this.statusService.deleteReplyStatus(statusReplyId).subscribe(data => {
      console.log('delete', data);
      this.getStatuses(this.userName);
    }, error => {
      console.log('không xoá đc');
    });
  }

}
