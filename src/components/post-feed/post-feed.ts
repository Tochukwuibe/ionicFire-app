import { Component, Input, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Post } from '../../models/posts.model';
import { DatabaseProvider } from '../../providers/database/database';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'post-feed',
  templateUrl: 'post-feed.html'
})
export class PostFeedComponent implements OnInit {

  public posts$: Observable<Post[]>

  constructor(private db: DatabaseProvider, private auth: AuthProvider) {
    console.log('Hello PostFeedComponent Component');
    
  }

  ngOnInit() {
    this.posts$ = this.db.getRecentPosts()
  }

}
