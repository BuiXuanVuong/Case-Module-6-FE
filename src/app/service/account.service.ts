import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAccount} from '../model/iaccount';
import {Iuser} from '../model/iuser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private API_URL = environment.URL;
  private BASE_URL = environment.BASE_URL;

  constructor(private httpClient: HttpClient) { }
  getAccountList(): Observable<any>{
    return this.httpClient.get(this.API_URL);
  }
  getAccount(id: number): Observable<IAccount>{
    return this.httpClient.get<IAccount>(`${this.API_URL}/${id}`);
  }
  createAccount(data: IAccount): Observable<IAccount>{
    return this.httpClient.post<IAccount>(`${this.API_URL}`, data);
  }
  deleteAccount(id: number): Observable<any>{
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
  updateAccount(data: IAccount): Observable<any>{
    return this.httpClient.put(`${this.API_URL}/${data.id}`, data);
  }

  getAccountListSuggest(): Observable<Iuser[]> {
    // @ts-ignore
    return this.httpClient.get<IAccount[]>(`${this.BASE_URL}/user`);
  }

}
