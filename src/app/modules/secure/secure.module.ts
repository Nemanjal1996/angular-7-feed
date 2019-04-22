import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StatusComponent } from './components/status/status.component';
import { SecureRoutingModule } from './secure-routing.module';
import { SecureComponent } from './secure.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostComponent } from './components/post/post.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';

import { TimeAgoPipe } from 'time-ago-pipe';
import { PostLikesComponent } from './components/post-likes/post-likes.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';

@NgModule({
  declarations: [
    SecureComponent,
    DashboardComponent,
    NavbarComponent,
    StatusComponent,
    CreatePostComponent,
    PostComponent,
    UserAvatarComponent,
    TimeAgoPipe,
    PostLikesComponent,
    PostCommentComponent
  ],
  imports: [
    CommonModule,
    SecureRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  entryComponents: [ CreatePostComponent ]
})
export class SecureModule { }
