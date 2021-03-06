import { Injectable, EventEmitter } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// @ts-ignore
import {TokenStorageService} from './token-storage.service';
import {IAccount} from '../model/iaccount';


import {BehaviorSubject, Observable} from 'rxjs';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  [x: string]: any;

  // @ts-ignore
  private currentUserSubject: BehaviorSubject<IAccount>;
  // @ts-ignore
  public currentUser: Observable<IAccount>;
  update = new EventEmitter<string>();

  private URL_API = environment.URL;
  private  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) { }


  public get currentUserValue(): IAccount {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.URL_API , {username, password})

      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.update.emit('login');
        return user;
      }));
  }
  register(user: IAccount): Observable<any>{
    return this.http.post(this.URL_API, {
      email: user.email,
      name: user.userName,
      password: user.password
    }, this.httpOptions);
  }
  isLogin(){
    const account = this.tokenStorage.getAccount();
    return !(account === null);
  }
}
