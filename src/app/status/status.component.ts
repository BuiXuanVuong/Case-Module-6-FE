import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../service/account.service';
import {TokenStorageService} from '../service/token-storage.service';
import {StatusService} from '../service/status.service';
import {IStatus} from '../model/istatus';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {LikeService} from '../service/like.service';
import firebase from 'firebase';
import auth = firebase.auth;
import {StatusReply} from '../model/status-reply';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  // @ts-ignore
  @Input() status: IStatus;
  listStatus: IStatus[] = [];
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



  constructor(private accountService: AccountService,
              private token: TokenStorageService,
              private statusService: StatusService,
              private likeService: LikeService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) {
    this.userNamePath = this.route.snapshot.params.userNamePath;

    console.log('name path: ' + this.userNamePath);
    if (this.userNamePath) {
      this.userName = this.userNamePath;
    } else {
      // @ts-ignore
      this.userName = auth.currentUserValue.userName;
    }
  }

  ngOnInit(): void {
    this.getStatuses(this.userName);
  }
  // getAll(): void{
  //   this.statusService.getOneStatus(1).subscribe((result) => {
  //     // this.listStatus = result;
  //   }, error => {
  //
  //   });
  // }

  private getStatuses(userName: any) {
    // @ts-ignore
    this.statusService.getAllStatus(userName).subscribe(data => {
      this.statuses = data;
      console.log(this.statuses);
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
  async deleteStatus(statusId) {
    // @ts-ignore
    console.log(this.statuses);
    this.statusService.deleteStatus(statusId).subscribe(data => {
      console.log('delete', data);
      this.getStatuses(this.userNamePath);
      console.log(this.getStatuses(this.userNamePath));
      // this.router.navigate(['/timeline', this.userNamePath]);

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


}
