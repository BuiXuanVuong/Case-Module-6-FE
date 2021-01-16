import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {Observable} from 'rxjs';
import {IStatus} from '../model/istatus';
import {INewfeedResponse} from '../model/inewfeed-response';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private API_URL = environment.API_URL;
  private BASE_URL = environment.BASE_URL;


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

  getAllStatus(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(`${this.BASE_URL}/home/1`);
  }

}
