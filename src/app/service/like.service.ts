import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IResultReponse} from '../model/iresult-reponse';

import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private LIKE_URL = environment.LIKE;

  constructor(private httpClient: HttpClient,
              private auth: AuthService) {
  }
  // tslint:disable-next-line:variable-name
  likeStatus(status_id: number, userName: string | undefined): Observable<any>{
    // @ts-ignore
    return this.httpClient.post(`${this.LIKE_URL}/${this.auth.currentUserValue.userName}/like/${status_id}`, null);

  }
  // tslint:disable-next-line:variable-name
  unlikeStatus(status_id: number, userName: string | undefined): Observable<IResultReponse>{
    return this.httpClient.delete<IResultReponse>(`${this.LIKE_URL}/${this.auth.currentUserValue.userName}/unlike/${status_id}`);

  }
  // tslint:disable-next-line:variable-name
  likeStatusReply(userName: number, statusReplyId: string | undefined): Observable<any>{
    return this.httpClient.post(`${this.LIKE_URL}/${this.auth.currentUserValue.userName}/like-status-reply/${statusReplyId}`, null);
  }
  // tslint:disable-next-line:variable-name
  unlikeStatusReply(userName: number, statusReplyId: string | undefined): Observable<IResultReponse>{
    return this.httpClient.delete<IResultReponse>(`${this.LIKE_URL}/${this.auth.currentUserValue.userName}/unlike-status-reply/${statusReplyId}`);

  }

}

