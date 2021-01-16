import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../post';
import {PostService} from '../post.service';
import {Router} from '@angular/router';
import {IAccount} from '../model/iaccount';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IImage} from '../model/iimage';
import {TokenStorageService} from '../service/token-storage.service';
import {StatusService} from '../service/status.service';

import {AngularFireStorage} from '@angular/fire/storage';
import {IStatus} from '../model/istatus';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  public id: any;
  // @ts-ignore
  statuses: IStatus[];

  constructor(private statusService: StatusService,
              route: Router) {
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




}
