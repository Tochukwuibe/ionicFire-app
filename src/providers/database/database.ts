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
      hearts: 0,
      ...post
    }

    return fromPromise( this.postsRef.add(doc))
    .pipe(take(1))
  }


  // adds a haert to a post
  createHearted(userId: string, post: Post) {
    const hearts = post.hearts || {}
    hearts[userId] = true; // setting the users id onto the post object

    return this.afs.doc(`posts/${post.id}`).update({hearts})
  }

  // removes a heart from the post 
  removeHearted(userId: string, post: Post) {
    const hearts = post.hearts;
    delete hearts[userId];

    return this.afs.doc(`posts/${post.id}`).update({hearts})
  }

  // retrieves an array of users from the db
  getUsers() {
    return this.afs.collection('users', ref => ref.limit(10))
    .snapshotChanges()
    .pipe(
      map(snapshot => {
        return snapshot.map(doc => {
          return {id: doc.payload.doc.id, ...doc.payload.doc.data()}
        })
      })
    )
  }

// implemention following 
public follow(followerId: string, followedId: string  ) {
  const docId = this.concatIds(followerId, followedId); // get the relationship as a string tp be used as the id of the doc 
  const createdAt = firebase.firestore.FieldValue.serverTimestamp(); 

  const data = { // creating the data that represents a following
    followerId,
    followedId,
    createdAt

  }

  return fromPromise( this.afs.doc(`relationships/${docId}`).set(data, {merge: true}))
}

// determines if a user us following another user
isFollowing(followerId: string, followedId: string) {
  const docId = this.concatIds(followerId, followedId);
  return this.afs.doc(`relationships/${docId}`).valueChanges() // checks the existence of a document with string relatioship
  
}



// implements unfollow
public unFollow(followerId: string, followedId: string ) {
  const docId = this.concatIds(followerId, followedId);
  return fromPromise( this.afs.doc(`relationships/${docId}`).delete()) // delets the doc with the string relatinship
}



  // helper to maintain follow relatinship 
  private concatIds(a: string, b: string) {
    return `${a}_${b}` // a is following b, the string can be split by the underscore to know the users
  }

}
