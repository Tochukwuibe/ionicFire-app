import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { Post } from '../../models/posts.model';
import { TabsPage } from '../tabs/tabs';



@IonicPage()
@Component({
  selector: 'page-post-create',
  templateUrl: 'post-create.html',
})
export class PostCreatePage {

 post = {} as Post




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    private db: DatabaseProvider,
    private loading: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostCreatePage');
  }



  onSubmit(user) {
    const loader = this.loading.create({
      content: `creating post...`
    })
    loader.present()
    console.log('creating post with ', user , this.post)
    this.db.createPost( user.uid, this.post)
    .subscribe(res => {
      this.navCtrl.setRoot('HomePage'); // navigatin back to the home page on success
      loader.dismiss()
    })

  }
}
