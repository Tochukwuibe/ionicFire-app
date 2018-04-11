import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {tap} from 'rxjs/operators';
import {of } from 'rxjs/observable/of';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';


@Injectable()
export class FcmProvider {

  constructor(
    private auth: AuthProvider,
    private firebase: Firebase,
    private afs: AngularFirestore,
    private platform: Platform) {
    console.log('Hello FcmProvider Provider');
  }

// getting the unique token for this users device 
  public getToken() {
    let token; 
    if (this.platform.is('cordova')) {
      // checking to see if permission is already granted 
      const status = this.firebase.hasPermission()
      status.then(res => {
        if (res.isEnabled) {
          // do nothing if permission is already granted
          console.log('notification permission already granted');
          return;
        } 
        return this.firebase.getToken() // otherwise request a new token
      })
      .then(token =>  this.saveTokenToDb(token))
    }
  }

  // monitors the refresh of the tokens and then updates it to firestore
  public monitorTokenRefresh() {
    if(this.platform.is('cordova')) {
      return this.firebase.onTokenRefresh()
      .pipe(
        tap(token => this.saveTokenToDb(token))
      )
    } else {
      // pwa implementation
      return of(null)
    }

  }

  // tokens are saved in a devices collection with the token as the id of each doc
  private saveTokenToDb(token: string) {

    if(!token) { // do nothing if the token is not defined
      return
    }
    

    const devicesRef = this.afs.collection('devices')

    this.auth.getCurrentUser()
    .then(user => {
        return {token, userId: user.uid}
    })
    .then(data => {
      return devicesRef.doc(token).set(data);
    })

  }

  // handels notifications that happen when the app is open
  public listenForNotifications() {
    if (this.platform.is('cordova')) {
      return this.firebase.onNotificationOpen()

    } else {
      // pwa implementation
      return of(null)
    }
  } 


// subscribes the user to a topic for notifications 
  subscribeTo(topic: string) {
    let currentUser;
   return  this.auth.getCurrentUser()
   .then(user => {
      currentUser = user;
      if (this.platform.is('cordova')) {
          return this.firebase.subscribe(topic) // subscribing the user to the topic 
      }
   })
   .then(res => {
        const topics = { topics: {[topic]: true} }  // addding this new topic to the users document
        return this.afs.doc(`users/${currentUser.uid}`).set(topics, {merge: true})
   })

  }


  // unsubscribe the use from a topic based notification 
  unsubscribeFrom(topic: string) {
    let currentUser;
    return  this.auth.getCurrentUser()
    .then(user => {
       currentUser = user;
       if (this.platform.is('cordova')) {
           return this.firebase.unsubscribe(topic) // subscribing the user to the topic 
       }
    })
    .then(res => {
         const topics =  { topics: {[topic]: false} } // addding this new topic to the users document
         return this.afs.doc(`users/${currentUser.uid}`).set(topics, {merge: true})
    })
 
  }


}
