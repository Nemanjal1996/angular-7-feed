import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/interfaces';
import { CommentService, UserService } from 'src/app/services';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {

  @Input() comment: Comment;
  @Input() postId: string;
  @Output() deletedComment: EventEmitter<string> = new EventEmitter();

  public userId: string;

  get checkIsLiked() {
    return !!this.comment.likes.find(like => like.userId._id === this.userId);
  }

  constructor(private commentService: CommentService, private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.getUserData().userId;
  }

  deleteComment(): void {
    this.commentService.deleteComment(this.postId, this.comment._id)
      .subscribe(response => {
        if (response) {
          this.deletedComment.emit(this.comment._id);
        }
      });
  }

  like(): void {
    this.commentService.like(this.comment._id)
      .subscribe(response => {
        if (response === 'unliked') {
          this.comment.likes = this.comment.likes.filter(like => like.userId._id !== this.userId);
          return;
        }
        this.comment.likes.push(response);
      });
  }

}
