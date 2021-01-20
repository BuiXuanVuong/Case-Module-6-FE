import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {Observable, throwError} from 'rxjs';
import {IStatus} from '../model/istatus';
import {INewfeedResponse} from '../model/inewfeed-response';
import {StatusReply} from '../model/status-reply';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private API_URL = environment.API_URL;
  private BASE_URL = environment.BASE_URL;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };


  constructor(private http: HttpClient,
              private token: TokenStorageService,
              private auth: AuthService) { }

  deleteStatusById(id: number): Observable<any>{
    return this.http.delete(`${this.API_URL}/${id}`);

  }

  getNewFeed(id: number): Observable<IStatus[]>{
    return this.http.get<IStatus[]>(this.API_URL + 'newfeed/' + id);

  }

  getOneStatus(id: number): Observable<IStatus>{
    return this.http.get<IStatus>(`${this.API_URL}/${id}`);
  }
  createStatus(userName: string | undefined, data: IStatus): Observable<any>{
    return this.http.post(`${this.API_URL}/` + this.auth.currentUserValue.userName, data);
  }

  editStatus( id: number, data: any): Observable<any>{
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  modifyStatus(userName: string, data: IStatus) {
    return this.http
      .put<any>(`${this.BASE_URL}/status/` + this.auth.currentUserValue.userName, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteStatus(statusId: number) {
   return  this.http.delete<any>(`${this.BASE_URL}/status/` + statusId).pipe(catchError(this.handleError));
  }


  // modifyStatus(statusId: number, data)

  getAllStatus(userName: string): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(`${this.BASE_URL}/` + userName);
  }

  addReplyStatus(statusId: number, userName: string, data: StatusReply): Observable<any> {
    // @ts-ignore
    return this.http
      .post(`${this.BASE_URL}/status/reply/` + statusId + `/` + this.auth.currentUserValue.userName, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  addStatusOnWallFriend(userNameLogin: string, userNamePath: string, data: IStatus) {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(`${this.BASE_URL}/status/friend/` + this.auth.currentUserValue.userName + '/' + userNamePath, data, this.httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


}
