import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFirestore } from 'angularfire2/firestore';


@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
public newName: string;

  constructor(
    public navCtrl: NavController,
   public navParams: NavParams,
    public auth: AuthProvider,
    private afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }


  updateProfile(user: any) {
    return this.afs.doc(`users/${user.uid}`).update({displayName: this.newName})
    .then(res => {
      this.navCtrl.pop();
    })
  }

}
