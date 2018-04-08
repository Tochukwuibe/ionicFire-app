import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the UserLogoutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-logout',
  templateUrl: 'user-logout.html'
})
export class UserLogoutComponent {

 

  constructor(private auth: AuthProvider, private nav: NavController) {
    console.log('Hello UserLogoutComponent Component');
   
  }

  logout() {
    this.auth.logOut()
    .then(res => {
      // this.nav.setRoot(LoginPage)
    })
  }

}
