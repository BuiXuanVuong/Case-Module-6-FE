import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IAccount} from '../model/iaccount';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IImage} from '../model/iimage';
import {TokenStorageService} from '../service/token-storage.service';
import {StatusService} from '../service/status.service';

import {AngularFireStorage} from '@angular/fire/storage';
import {IStatus} from '../model/istatus';
import {finalize} from 'rxjs/operators';
import {StatusReply} from '../model/status-reply';
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
  @Output()
  statusReplyResp = new EventEmitter();

  public id: any;
  // @ts-ignore
  statuses: IStatus[];
  // @ts-ignore
  accountId: number;
  // @ts-ignore
  statusId: number;
  // @ts-ignore

  currentStatus: IStatus = {
    id: 0,
    content: '',
    images: [],
    totalStatusReplyLike: 0,
    totalLikes: 0,

  };
  totalRecord = 0;
  // @ts-ignore

  statusReply: StatusReply;

  constructor(private statusService: StatusService,
              private router: Router,
              private route: ActivatedRoute,
              private likeService: LikeService,
              ) {
    // @ts-ignore
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.getStatuses(this.id);
    // @ts-ignore
  }

  private getStatuses(id: any) {
    // @ts-ignore
    this.statusService.getAllStatus(id).subscribe(data => {
      this.statuses = data;
    });
  }



  // @ts-ignore
  public save(statusId, wallId) {
    // @ts-ignore
    this.statusService.addReplyStatus(statusId, wallId, this.createReplyStatus()).subscribe((data) => {
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
   this.router.navigate(['friend-list-suggest', this.id]);

  }

  waitInvitation() {
    this.router.navigate(['invite-friend', this.id]);
  }

  listFriends() {
    this.router.navigate(['list-friend', this.id]);
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

  // @ts-ignore
  // tslint:disable-next-line:variable-name
  likeStatusReply(statusReply_id: number, event){
    this.likeService.likeStatusReply(this.accountId, statusReply_id).subscribe((resp) => {
      this.getStatuses(this.id);
      console.log('Like thành công');

    }, error => {
      console.log('Không thể like');
    });
    this.statusReplyResp.emit(event);
  }

  // @ts-ignore
  // tslint:disable-next-line:variable-name
  unlikeStatusReply(statusReply_id: number, event){
    this.likeService.unlikeStatusReply(this.accountId, statusReply_id).subscribe((resp) => {
      console.log('Huỷ like thành công');
      this.getStatuses(this.id);
    }, error => {
      console.log('Không thể huỷ like');
    });
    this.statusReplyResp.emit(event);
  }

}
