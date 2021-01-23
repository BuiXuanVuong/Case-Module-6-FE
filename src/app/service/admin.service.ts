import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAccount} from '../model/iaccount';
const apiUrl = environment.apiSource;

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private httpClient: HttpClient) { }

  getAllUser(): Observable<IAccount[]>{
    return this.httpClient.get<IAccount[]>(`${apiUrl}/users`);
  }

  blockActiveUser(userId: number, user: IAccount ): Observable<IAccount> {
    return this.httpClient.put<IAccount>(`${apiUrl}/users/${userId}/block`, user);
  }

  unBlockActiveUser(userId: number, user: IAccount): Observable<IAccount>{
    return this.httpClient.put<IAccount>(`${apiUrl}/users/${userId}/unblock`, user);
  }
}
