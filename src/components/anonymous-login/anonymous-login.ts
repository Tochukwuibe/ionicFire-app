import { NavController, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../../pages/tabs/tabs';

@Component({
  selector: 'anonymous-login',
  templateUrl: 'anonymous-login.html'
})
export class AnonymousLoginComponent {



  constructor(
    private auth: AuthProvider, 
    private nav: NavController, 
    private loading : LoadingController
  ) {
    console.log('Hello AnonymousLoginComponent Component');
   
  }


 async  login() {
  const loader = this.loading.create({
    content: 'Logging in anonoymously...'
  })
  loader.present();

  await this.auth.anonymousLogin(); // await keyword block the execution until promoise resolves

  loader.dismiss();

  await this.nav.setRoot(TabsPage);

  }

}
