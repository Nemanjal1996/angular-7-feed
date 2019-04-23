import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FeedService } from 'src/app/services';
import { Post } from 'src/app/interfaces';
import { CreatePostComponent } from '../create-post/create-post.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @Output() deletedPost: EventEmitter<string> = new EventEmitter();

  public imageBase = environment.apiUrl;

  constructor(private feedService: FeedService,
              private dialog: MatDialog) { }

  ngOnInit() { }

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
      
    });
  }
}
