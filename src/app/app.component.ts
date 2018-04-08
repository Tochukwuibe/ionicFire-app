import { Component, OnDestroy } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnDestroy {
  rootPage:any  = null;
  private sub: Subscription
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, auth: AuthProvider) {
    platform.ready().then(() => {
      // checking to make sure the user is authenticated
     this.sub = auth.user$
      .subscribe(user => {
        
        console.log('changing the page based on ', user)
        user? this.rootPage = TabsPage : this.rootPage = LoginPage;

          statusBar.styleDefault(); 
          splashScreen.hide();  // hide the splash page once its all done
      })


    
     
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
