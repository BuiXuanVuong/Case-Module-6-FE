import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../service/account.service';
import {TokenStorageService} from '../service/token-storage.service';
import {StatusService} from '../service/status.service';
import {IAccount} from '../model/iaccount';
import {IStatus} from '../model/istatus';
import {INewfeedResponse} from '../model/inewfeed-response';
import {IComment} from '../model/icomment';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  // // @ts-ignore
  // statuses: IStatus[];
  // current_id: number;
  //
  // newFeedResponse: INewfeedResponse[];
  //
  // comments: IComment[];
  //
  // delete_comment_id: number;
  //
  // status_id: number;
  //
  // @Input()
  // currentAccount: IAccount;
  //
  // // @ts-ignore
  // currentStatus: IStatus = {
  //   id: 0,
  //   content: '',
  //   images: [],
  //   totalComments: 0,
  //   totalLikes: 0,
  //
  // };
  //
  // new_comment: IComment = {
  //   content: '',
  //   account: {
  //     id: this.current_id,
  //   },
  //
  // };
  //
  //
  // status_id_loading_comments: number;
  //
  // total_record = 0;
  // notEmptyRecord = true;
  // notScroll = true;
  //
  //
  //
  constructor(private accountService: AccountService,
              private token: TokenStorageService,
              private statusService: StatusService,
              ) {
  }

  ngOnInit(): void {
    // this.current_id = this.token.getAccount();
    // this.getFirstNewFeed();
  }
  //
  //
  // getFirstNewFeed() {
  //   this.statusService.getNewFeed2(this.current_id, 0).subscribe(
  //     (newfeed: any) => {
  //       this.newFeedResponse = newfeed;
  //       if (newfeed.length == 0){
  //         this.notEmptyRecord = false;
  //       }
  //       this.total_record += newfeed.length;
  //       this.newFeedResponse.map(
  //         status1 =>
  //           status1.status.createDate = new Date(status1.status.createDate));
  //     }
  //   );
  // }
  //
  //
  // deleteStatus(id: number) {
  //   this.statusService.deleteStatusById(id).subscribe((response) => {
  //     if (response.message == 'xóa thành công') {
  //       this.notice.success('Xóa thành công');
  //       this.updateNewFeed();
  //     } else {
  //       this.notice.fail('Thử lại sau');
  //     }
  //   }, () => {
  //     this.notice.fail('Lỗi kết nối');
  //   });
  //
  // }


}
