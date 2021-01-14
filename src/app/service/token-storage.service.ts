import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string{
    // @ts-ignore
    return  localStorage.getItem(this.TOKEN_KEY);
  }
  public saveAccount(account: any): void{
    // @ts-ignore
    window.localStorage.removeItem(this.USER_KEY);
    // @ts-ignore
    window.localStorage.setItem(this.USER_KEY, JSON.stringify(account));
  }

  public getAccount(): any{
    // @ts-ignore
    return JSON.parse(localStorage.getItem(this.USER_KEY) as string);
  }

}
