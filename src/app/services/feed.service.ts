import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Post, Posts, CreatedPost } from '../interfaces';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private httpService: HttpService) { }

  createPost(post: any): Observable<CreatedPost> {
    return this.httpService.postData('feed/post', post, {
      headers: new HttpHeaders({
        Authorization: `bearer ${this.httpService.getToken()}`
      }),
      options: this.httpService.options
    });
  }

  updatePost(post: any, id: string): Observable<CreatedPost> {
    return this.httpService.putData('feed/post/' + id, post, {
      headers: new HttpHeaders({
        Authorization: `bearer ${this.httpService.getToken()}`
      }),
      options: this.httpService.options
    });
  }

  getPosts(): Observable<Posts> {
    return this.httpService.getData('feed/posts', {
      headers: this.httpService.headers,
      options: this.httpService.options
    });
  }

  deletePost(id: number): Observable<string> {
    return this.httpService.deleteData('feed/post/' + id, {
      headers: this.httpService.headers,
      options: this.httpService.options
    });
  }
}
