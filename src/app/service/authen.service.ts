import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {IAccount} from '../model/iaccount';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private URL_API = environment.URL;
  private  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) { }
  login(credentials: IAccount): Observable<any> {

    // @ts-ignore

    return this.http.get(this.URL_API, credentials);
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
