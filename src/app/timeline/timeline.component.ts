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

  constructor(private statusService: StatusService,
              private router: Router,
              private route: ActivatedRoute ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.getStatuses(this.id);
  }

  private getStatuses(id: any) {
    // @ts-ignore
    this.statusService.getAllStatus(id).subscribe(data => {
      this.statuses = data;
    });
  }

  public save() {
    this.statusService.addReplyStatus(this.createReplyStatus()).subscribe((data) => {
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
  editStatus(statusId) {
    this.router.navigate(['status-form', statusId]);
  }


}
