import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAccount} from '../model/iaccount';
import {Iuser} from '../model/iuser';
import {DomSanitizer} from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient,
              private sanitizer: DomSanitizer) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    }),
  };
  private API_URL = environment.URL;
  private BASE_URL = environment.BASE_URL;


  getAccountList(): Observable<any> {

    return this.httpClient.get(this.API_URL);
  }

  getAccount(id: number): Observable<IAccount> {
    return this.httpClient.get<IAccount>(`${this.API_URL}/${id}`);
  }

  createAccount(data: IAccount): Observable<IAccount> {
    return this.httpClient.post<IAccount>(`${this.API_URL}`, data);
  }

  deleteAccount(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }

  updateAccount(data: IAccount): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/${data.id}`, data);
  }



  getAccountProfile(id: string): Observable<IAccount> {
    return this.httpClient.get<IAccount>(`${this.API_URL}/${1}`);

  }
  updateUserProfile(id: any, user: IAccount): Observable<IAccount> {
    return this.httpClient.put<IAccount>(`${this.API_URL}/${1}`, user);
  }

// @ts-ignore
  getAccountListSuggest(id: number): Observable<IAccount[]> {
    return this.httpClient.get<IAccount[]>(`${this.BASE_URL}/search/` + id);
  }

  requestFriend(idPost: number, idGet: number): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/invite/` + idPost + `/` + idGet);
  }

  acceptFriend(idGet: number, idPost: number): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/connect/` + idGet + `/` + idPost);
  }

  getListInvite(id: number): Observable<any> {
    return this.httpClient.get<IAccount[]>(`${this.BASE_URL}/user/invite/` + id);
  }

  getListFriends(id: number): Observable<any> {
    return this.httpClient.get<IAccount[]>(`${this.BASE_URL}/list-friend/` + id);
  }


}
