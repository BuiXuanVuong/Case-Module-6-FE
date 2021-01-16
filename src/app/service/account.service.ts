import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAccount} from '../model/iaccount';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private API_URL = environment.URL;

  constructor(private httpClient: HttpClient) {
  }

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

  userDetail(id: string): Observable<IAccount> {
    return this.httpClient.get<IAccount>(this.API_URL + `/users/${id}`);
  }

  getAccountProfile(id: string): Observable<IAccount> {
    return this.httpClient.get<IAccount>(`${this.API_URL}/${1}`);

  }
  updateUserProfile(id: any, user: IAccount): Observable<IAccount> {
    return this.httpClient.put<IAccount>(`${this.API_URL}/${1}`, user);
  }
}
