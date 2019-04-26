import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpService: HttpService) { }

  postComment(id: string, comment: string): Observable<any> {
    return this.httpService.putData('feed/post/' + id + '/comment', { comment }, {
      headers: this.httpService.headers,
      options: this.httpService.options
    });
  }

  deleteComment(postId: string, commentId: string): Observable<any> {
    return this.httpService.deleteData('feed/post/' + postId + '/comment/' + commentId, {
      headers: this.httpService.headers,
      options: this.httpService.options
    });
  }

  like(commentId: string): Observable<any> {
    return this.httpService.putData('feed/comment/' + commentId + '/like', {}, {
      headers: this.httpService.headers,
      options: this.httpService.options
    });
  }
}
