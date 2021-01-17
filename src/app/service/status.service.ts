import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {Observable, throwError} from 'rxjs';
import {IStatus} from '../model/istatus';
import {INewfeedResponse} from '../model/inewfeed-response';
import {StatusReply} from '../model/status-reply';
import {catchError} from 'rxjs/operators';

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
              private token: TokenStorageService) { }

  deleteStatusById(id: number): Observable<any>{
    return this.http.delete(`${this.API_URL}/${id}`);

  }

  getNewFeed(id: number): Observable<IStatus[]>{
    return this.http.get<IStatus[]>(this.API_URL + 'newfeed/' + id);

  }

  getOneStatus(id: number): Observable<IStatus>{
    return this.http.get<IStatus>(`${this.API_URL}/${id}`);
  }
  createStatus(id: number | undefined, data: IStatus): Observable<any>{
    return this.http.post(`${this.API_URL}/${1}`, data);
  }

  editStatus( id: number, data: any): Observable<any>{
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  modifyStatus(statusId: number, data: IStatus) {
    return this.http
      .put<any>(`${this.BASE_URL}/status/` + statusId, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // modifyStatus(statusId: number, data)

  getAllStatus(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(`${this.BASE_URL}/home/1`);
  }

  addReplyStatus(data: StatusReply): Observable<any> {
    // @ts-ignore
    return this.http
      .post(`${this.BASE_URL}/status/reply/4/1`, data, this.httpOptions)
      .pipe(catchError(this.handleError));
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
