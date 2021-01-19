import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from './user-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // @ts-ignore
  private currentUserSubject: BehaviorSubject<UserToken>;
  private currentUser: Observable<UserToken>;
  constructor() { }
}
