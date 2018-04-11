import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {Observable} from 'rxjs/Observable';
import {take, switchMap, map, first} from 'rxjs/operators';
import { Platform } from 'ionic-angular';

import { Facebook } from '@ionic-native/facebook';



@Injectable()
export class AuthProvider {

public user$: Observable<any>;


  constructor(
    private afAuth: AngularFireAuth, 
    private afs: AngularFirestore,
    private facebook: Facebook,
    private platform: Platform
  ) {
    console.log('Hello AuthProvider Provider');
    this.user$ = this.afAuth.authState
    .pipe(
      switchMap(user => {

        console.log('firebase authsate observable fired', user)
        if (user) {

          return this.afs.doc(`users/${user.uid}`).valueChanges()
        }else {

          return Observable.of(null)
        }
      })
    )

  }


  // getting the current user as a promise to be used to check the auth status 
  getCurrentUser() {
    return this.user$.filter(res => !!res).pipe(first()).toPromise()
  }


// saves a users data to firestore
private updateUserData(user : any) {
  
  const data = {
    uid: user.uid,
    email: user.email || null,
    displayName: user.displayName || 'nameless user',
    photoURL: user.photoURL || 'https://goo.gl/fz9nrq'
  }

  return this.afs.doc(`users/${user.uid}`).set(data, {merge: true})
}


// anonymous login 
async anonymousLogin (): Promise<void> {
  const user = await this.afAuth.auth.signInAnonymously(); // gettingthe return value of the promise
  await this.updateUserData(user);
}



// facebook login
async facebookLogin() {
 
if(this.platform.is('cordova')) {
 
  return await this.nativeFbLogin()
} else {
    return await this.webFbLogin()
}

}

private async nativeFbLogin(): Promise<void> {
  console.log('native login')

return this.facebook.login(['email', 'public_profile'])
.then(res => {
    return firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
})
.then(fbCredentials => {
  return firebase.auth().signInWithCredential(fbCredentials)
})
.then(user => {
  console.log('updating the user', user)
    return this.updateUserData(user);
})
.catch(err => console.log('somthing went wrong ', err))






}

// facebook login for the web
private async webFbLogin(): Promise<void> {

  console.log('web login')

  try {
    const provider = new firebase.auth.FacebookAuthProvider();

    const credentials = await this.afAuth.auth.signInWithPopup (provider);

    return await this.updateUserData(credentials.user);

  } catch (e) {
    console.log('native fb login err', e)
  }

}

//log out 
public logOut(): Promise<any> {
  return this.afAuth.auth.signOut();
}





}
