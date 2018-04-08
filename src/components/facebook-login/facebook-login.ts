import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the FacebookLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'facebook-login',
  templateUrl: 'facebook-login.html'
})
export class FacebookLoginComponent {




  constructor(private auth: AuthProvider, private nav: NavController) {
    console.log('Hello FacebookLoginComponent Component');

  }

 async login() {
   const res = await this.auth.facebookLogin()
  if (res ) {
    await this.nav.setRoot(TabsPage);
  }
   
  }

}
