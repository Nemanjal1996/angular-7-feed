import { Component, OnInit, Input } from '@angular/core';
import { Like } from 'src/app/interfaces';

@Component({
  selector: 'app-post-likes',
  templateUrl: './post-likes.component.html',
  styleUrls: ['./post-likes.component.scss']
})
export class PostLikesComponent implements OnInit {

  public totalLikes: number;
  @Input() likes: Like[];

  constructor() { }

  ngOnInit() {
    this.totalLikes = this.likes.length;
  }
}
