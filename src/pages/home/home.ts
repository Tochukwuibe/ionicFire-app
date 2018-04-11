import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeInterstitial, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private adMob: AdMobFree, 
    private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    if (this.platform.is('cordova')) {
      const ad: AdMobFreeInterstitialConfig = {
        id: 'ca-app-pub-3370356077623777/1118426893',
        isTesting: false,
        autoShow: false
      }
      this.adMob.interstitial.config(ad);

      // 1 in 4 chance to see an ad
      
        this.adMob.interstitial.prepare()
        .then(res => {
          console.log('the ad was prepared')
          return this.adMob.interstitial.isReady()
        })
        .then(res => {
          console.log('the ad is ready');
          return this.adMob.interstitial.show() 
        })
        .then(res => console.log('the ad should have been shown'))
        .catch(err => console.log('add broke ', err))
    

    }
  }

}
