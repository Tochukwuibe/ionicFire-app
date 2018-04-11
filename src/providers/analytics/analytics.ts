import { Injectable } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { AuthProvider } from '../auth/auth';


@Injectable()
export class AnalyticsProvider {

  constructor(
    private app: App,
    private platform: Platform,
    private firebase: Firebase,
    private auth: AuthProvider) {
    console.log('Hello AnalyticsProvider Provider');

      if(platform.is('cordova')) { // gathering analytics for nativa apps
        app.viewDidEnter.subscribe(view => { // subscribing to pages the user visits

          firebase.setScreenName(view.name) // letting firebase know about the pages
          firebase.logEvent('page_view', {page: view.name}) // lets us know when people have view our pages on firebase

        });

        auth.user$
        .subscribe(user => {
          const uid = user ? user.uid : 'guest';  // monitoring out users also 
          firebase.setUserId(uid); // letting firebase know about our users
        })

      }


  }


// used to log any events around the app that we wish to track
  logEvent(event: string, data?: Object) {
    if(this.platform.is('cordova')) {
      console.log('analytics log...', event)
      return this.firebase.logEvent(event, data); // telling firebase about the event
    }
  }


  


}
