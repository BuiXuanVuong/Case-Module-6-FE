
import {Component, Input, OnInit} from '@angular/core';
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
import {AuthService} from '../auth.service';

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

  constructor(private statusService: StatusService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) {
    // @ts-ignore
    this.id = this.route.snapshot.params.id;
    this.userName = auth.currentUserValue.userName;

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
   this.router.navigate(['friend-list-suggest', this.userName]);

  }

  waitInvitation() {
    this.router.navigate(['invite-friend', this.userName]);
  }

  listFriends() {
    this.router.navigate(['list-friend', this.id]);
  }


}
