import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { RemoteConfigProvider } from '../../providers/remote-config/remote-config';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  bannerText: Promise<any>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public remote: RemoteConfigProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.bannerText = this.remote.getValue('profile_banner');
  }

  ionViewCanEnter(){ // can enter is a good place to include rout protection logic
    // return this.auth.gerCurrentUser() // allows enterance only if user is defined
  }

  onEdit() {
    this.navCtrl.push('ProfileEditPage')
  }
}
