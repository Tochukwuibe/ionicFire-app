import { Component, Input, OnInit } from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'user-relationships',
  templateUrl: 'user-relationships.html'
})
export class UserRelationshipsComponent implements OnInit{

@Input() currentUserId: string; // current user
@Input() followId: string;  // user to be followed or unfollowed


isOwner: boolean // ued to know if thecurrent user is the owner so they cant folloe themselves
isFollowing$: Observable<any>; // used to thow if the follow relationship already exists

  constructor(public  db: DatabaseProvider) {
    console.log('Hello UserRelationshipsComponent Component');

  }


  ngOnInit() {
    // checking for is owner 
    this.isOwner = this.currentUserId === this.followId;
    // checking to see if the relatinship exists 
    this.isFollowing$ = this.db.isFollowing(this.currentUserId, this.followId);

  }

}
