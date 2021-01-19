import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from './user-token';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // @ts-ignore
  private currentUserSubject: BehaviorSubject<UserToken>;
  // @ts-ignore
  private currentUser: Observable<UserToken>;
  // @ts-ignore
  update = new EventEmitter<string>();
  constructor(private http: HttpClient) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // @ts-ignore
  public get currentUserValue(): UserToken{
    return this.currentUserSubject.value;
  }

  login(userName: string, password: string) {
    return this.http.post(API_URL + '/login', {userName, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.update.emit('user');
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}
