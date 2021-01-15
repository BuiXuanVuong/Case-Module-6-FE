import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseURL = 'http://localhost:8080/api/v1/posts';

  constructor(private httpClient: HttpClient) { }

  getPostsList(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${this.baseURL}`);
  }

  createPost(post: Post): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, post);
  }
}
