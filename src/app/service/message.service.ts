import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../model/message';
import {AuthService} from '../auth.service';
import {Iuser} from '../model/iuser';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private BASE_URL = environment.BASE_URL;
  constructor(private httpClient: HttpClient,
              private auth: AuthService) {

  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    }),
  };

  getMessageList(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${this.BASE_URL}/message/` + this.auth.currentUserValue.userName);
  }

  createMessage(userLogin: Iuser, userPath: Iuser, message: Message) {
    // @ts-ignore
    return this.httpClient.post<any>(`${this.BASE_URL}/message/` + this.auth.currentUserValue.userName + `/` + userPath, message, this.httpOptions);
  }

}
