import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IResultReponse} from '../model/iresult-reponse';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private LIKE_URL = environment.LIKE;

  constructor(private httpClient: HttpClient) {
  }
  // tslint:disable-next-line:variable-name
  likeStatus(status_id: number, account_id: number): Observable<any>{
    // @ts-ignore
    return this.httpClient.post(`${this.LIKE_URL}/${1}/like/${1}`, null);

  }
  // tslint:disable-next-line:variable-name
  unlikeStatus(status_id: number , account_id: number): Observable<IResultReponse>{
    return this.httpClient.delete<IResultReponse>(`${this.LIKE_URL}/${1}/unlike/${1}`);
  }

}

