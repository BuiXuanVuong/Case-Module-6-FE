import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {IAccount} from '../model/iaccount';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../auth.service';
import {User} from '../user';
import {Iuser} from '../model/iuser';


@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private httpClient: HttpClient,
              private sanitizer: DomSanitizer,
              private auth: AuthService) { }

  keyword = new BehaviorSubject<string>('');
  currentKeyword = this.keyword.asObservable();

   private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    }),
  };
  private API_URL = environment.URL;
  private BASE_URL = environment.BASE_URL;

  // @ts-ignore
  changeKeyword(keyword){
    this.keyword.next(keyword);
  }


  getAccountList(): Observable<any> {

    return this.httpClient.get(this.API_URL);
  }

  getAccount(id: number): Observable<IAccount> {
    return this.httpClient.get<IAccount>(`${this.API_URL}/${id}`);
  }

  createAccount(data: IAccount): Observable<IAccount> {

    return this.httpClient.post<IAccount>(this.API_URL, data);
  }

  deleteAccount(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }

  updateAccount(data: IAccount): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/${data.id}`, data);
  }



  getAccountProfile(id: string): Observable<IAccount> {
    return this.httpClient.get<IAccount>(`${this.API_URL}/${3}`);

  }
  updateUserProfile(id: any, user: IAccount): Observable<IAccount> {
    return this.httpClient.put<IAccount>(`${this.API_URL}/${3}`, user);
  }

// @ts-ignore
  getAccountListSuggest(userName: string): Observable<IAccount[]> {
    return this.httpClient.get<IAccount[]>(`${this.BASE_URL}/searchFriend/` + this.auth.currentUserValue.userName);
  }

  requestFriend(userName: string, idGet: number): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/invite/` + userName + `/` + idGet);
  }

  acceptFriend(userName: string, idPost: number): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/connect/` + userName + `/` + idPost);
  }

  getListInvite(userName: string): Observable<any> {
    return this.httpClient.get<IAccount[]>(`${this.BASE_URL}/user/invite/` + this.auth.currentUserValue.userName);
  }

  getListFriends(id: number): Observable<any> {
    return this.httpClient.get<IAccount[]>(`${this.BASE_URL}/list-friend/` + this.auth.currentUserValue.userName);
  }

  getUserLoginByUserName(userName: string | undefined): Observable<any> {
    return this.httpClient.get<Iuser>(`${this.BASE_URL}/search/` + this.auth.currentUserValue.userName);
  }

  getUserPathByUserName(userNamePath: string | undefined): Observable<any> {
    return this.httpClient.get<Iuser>(`${this.BASE_URL}/search/` + userNamePath);
  }

  getSearchAccountListSuggest(userName: string, keyword: string): Observable<IAccount[]> {
    return this.httpClient.get<IAccount[]>(`${this.BASE_URL}/searchFriend/` + this.auth.currentUserValue.userName + '?search=' + keyword);
  }

}
