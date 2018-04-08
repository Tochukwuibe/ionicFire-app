import { Component, Input } from '@angular/core';
import { Post } from '../../models/posts.model';
import { DatabaseProvider } from '../../providers/database/database';


@Component({
  selector: 'heart-button',
  templateUrl: 'heart-button.html'
})
export class HeartButtonComponent {
@Input() userId: string;
@Input() post: Post;


  constructor(public db: DatabaseProvider) {
    console.log('Hello HeartButtonComponent Component');

  }

  public get heartCount(): number {
    return this.post.hearts ? Object.keys(this.post.hearts).length: 0;
  }


  public get isHearted(): boolean {
    return !!(this.post.hearts && this.post.hearts[this.userId]);
  }

}
