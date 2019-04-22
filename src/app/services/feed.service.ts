import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Post } from '../interfaces';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private httpService: HttpService) { }

  createPost(post: any): Observable<any> {
    return this.httpService.postData('feed/post', post, {
      headers: new HttpHeaders({
        Authorization: `bearer ${this.httpService.getToken()}`
      }),
      options: this.httpService.options
    });
  }

  getPosts(): Observable<any> {
    return this.httpService.getData('feed/posts', {
      headers: this.httpService.headers,
      options: this.httpService.options
    });
  }
}
