import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostInterface} from '../../models/post';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private readonly httpClient: HttpClient) { }

  public getAllPosts(): Observable<Array<PostInterface>> {
    return this.httpClient.get<Array<PostInterface>>(environment.jsonApiUrl + 'posts');
  }

  public deletePost(id: number): Observable<PostInterface> {
    return this.httpClient.delete<PostInterface>(environment.jsonApiUrl + 'posts/' + id.toString());
  }
}
