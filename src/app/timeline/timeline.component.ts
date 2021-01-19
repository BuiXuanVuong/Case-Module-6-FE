
import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';
import {ActivatedRoute, Router} from '@angular/router';
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


  constructor(private statusService: StatusService,
              private router: Router,
              private route: ActivatedRoute,

              private auth: AuthService,

              private likeService: LikeService) {

    // @ts-ignore
    this.userNamePath = this.route.snapshot.params.userNamePath;

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
    // @ts-ignore
  }

  private getStatuses(userName: any) {
    // @ts-ignore
    this.statusService.getAllStatus(userName).subscribe(data => {
      this.statuses = data;
    });
  }

  // @ts-ignore
  public save( statusId, userName) {
    // @ts-ignore
    this.statusService.addReplyStatus(statusId, this.auth.currentUserValue.userName,  this.createReplyStatus()).subscribe((data) => {
      console.log('OK');
      this.replyStatusForm.reset();
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
    // @ts-ignore
    this.statusService.deleteStatus(statusId).subscribe(data => {
      console.log('delete', data);
    });
  }

  // @ts-ignore
  editStatus(statusId) {
    this.router.navigate(['status-form', statusId]);
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


  likeStatus(statusId: number, accountId: number){
    this.likeService.likeStatus(statusId, this.accountId ).subscribe(data => {
      console.log('like status');
      this.getStatuses(this.id);
    }, error => {
      console.log('Không thể like');
    });
  }

  unlikeStatus(statusId: number, accountId: number){
    this.likeService.unlikeStatus(statusId, this.accountId).subscribe(
      data => {
        console.log('Huỷ like thành công');
        this.getStatuses(this.id);
      }, error => {
        console.log('Không thể huỷ like');
      }
    );

  }


}
