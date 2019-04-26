import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FeedService, CommentService, UserService } from 'src/app/services';
import { Post } from 'src/app/interfaces';
import { CreatePostComponent } from '../create-post/create-post.component';
import { MatDialog } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @Output() deletedPost: EventEmitter<string> = new EventEmitter();

  public commentForm: FormGroup;
  public imageBase = environment.apiUrl;
  public userId: string;

  get checkIsLiked() {
    return !!this.post.likes.find(like => like.userId._id === this.userId);
  }
  
  constructor(private feedService: FeedService,
              private commentService: CommentService,
              private userService: UserService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required]]
    });
  }

  ngOnInit() { 
    this.userId = this.userService.getUserData().userId;
  }

  deletePost(id: number): void {
    this.feedService.deletePost(id)
      .subscribe(response => {
        this.deletedPost.emit(response);
      });
  }

  openEditPostDialog(post: Post): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '600px',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.post = result;
      }
    });
  }

  postLike() {
    this.feedService.postLike(this.post._id)
      .subscribe(response => {
        if(response === 'unliked') {
          this.post.likes = this.post.likes.filter(like => like.userId._id !== this.userId);
          return;
        }
        this.post.likes.push(response);
      });
  }

  postComment() {
    if (this.commentForm.valid) {
      this.commentService.postComment(this.post._id, this.commentForm.value.comment)
        .subscribe(response => {
          if (response) {
            this.commentForm.reset();
            this.post.comments.push(response);
          }
        });
    }
  }

  onDeleteComment(e) {
    this.post.comments = this.post.comments.filter(c => c._id !== e);
  }
}
