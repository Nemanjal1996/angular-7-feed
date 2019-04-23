import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../../components/create-post/create-post.component';
import { FeedService } from 'src/app/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public posts: any[] = [];
  public totalItems: number;

  constructor(private dialog: MatDialog,
              private feedService: FeedService) { }

  ngOnInit() {
    this.getPosts();
  }

  openCreatePostDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.posts.unshift(result);
      }
    });
  }

  onDeletedPost(e) {
    this.getPosts();
  }

  getPosts(): void {
    this.feedService.getPosts()
      .subscribe(response => {
        this.posts = response.posts;
        this.totalItems = response.totalItems;
      });
  }
}
