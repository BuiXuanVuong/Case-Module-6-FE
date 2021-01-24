import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StatusReply} from '../model/status-reply';
import {IStatus} from '../model/istatus';
import {StatusService} from '../service/status.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccountService} from '../service/account.service';
import {IAccount} from '../model/iaccount';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  @Input()
    // @ts-ignore
  comment: StatusReply;

  toggleEditFormComment = false;
  // @ts-ignore
  currentUser: IAccount;

  constructor(private statusService: StatusService,
              private  userService: AccountService) { }

  ngOnInit(): void {

  }
  toggleForm(): void {
    if (this.toggleEditFormComment) {
      this.toggleEditFormComment = false;
    } else {
      this.toggleEditFormComment = true;
    }
  }


  editStatusReply(): void {
    // @ts-ignore
    this.comments.statusReplyBody = document.getElementById('statusReplyBody').value;
    console.log(this.comment);


    // @ts-ignore
    this.statusService.editReplyStatus(this.statusReplyId, this.userName, this.userNamePath).subscribe(result => {

      console.log('Đổi nội dung thành công');
      console.log('update comment ok');
    }, error => {
      console.log('update content error !');
    });
  }

}
