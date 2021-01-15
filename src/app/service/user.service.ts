import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Iuser} from '../model/iuser';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080"

  constructor(private httpClient: HttpClient) { }

  getUserListSuggest(): Observable<Iuser[]> {
    return this.httpClient.get<Iuser[]>(`${this.baseURL}/search/`);
  }
}
