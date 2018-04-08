import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Post } from '../../models/posts.model';
import { of } from 'rxjs/observable/of';
import {map, take} from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private postsRef : AngularFirestoreCollection<Post>;

  constructor(private afs: AngularFirestore) {
    console.log('Hello DatabaseProvider Provider');
    this.postsRef = this.afs.collection<Post>('posts');
  }


  // returning the 10 latest posts
  getRecentPosts(): Observable<Post[]> {
    console.log('getting latest posts')
    return this.afs.collection<Post>('posts', ref => {
      return ref.orderBy('createdAt', 'desc')
      .limit(10)
    }).snapshotChanges()
    .pipe(
      map(snapshot => {
        return snapshot.map(doc => {
          console.log('the posts', {id: doc.payload.doc.id, ...doc.payload.doc.data() as Post} )
          return {id: doc.payload.doc.id, ...doc.payload.doc.data() as Post}
        })
      })
    )
  }

// return the posts for a specific user
  getUserPosts(userId: string ) {
    return this.afs.collection('posts', ref => {
      return ref.orderBy('createdAt', 'desc')
      .where('userId', '==', userId)
      .limit(10)
    }).snapshotChanges()
    .pipe(
      map(snapshot => {
        return snapshot.map(doc => {
          return {id: doc.payload.doc.id, ...doc.payload.doc.data() as Post}
        })
      })
    )
  }

  // creates a post  with a users as its owner
  createPost(userId: string, post: Post) {
    const createdAt = firebase.firestore.FieldValue.serverTimestamp(); 

    const doc: Post = {
      userId: userId,
      createdAt: createdAt,
      ...post
    }

    return fromPromise( this.postsRef.add(doc))
    .pipe(take(1))
  }

}
