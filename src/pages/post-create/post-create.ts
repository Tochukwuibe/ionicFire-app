import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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

  @ViewChild('content') content: HTMLInputElement; 
  @ViewChild('img') img: HTMLInputElement;

 post = {} as Post




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    private db: DatabaseProvider,
    private loading: LoadingController,
    private toast: ToastController
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

    const toast = this.toast.create({message: 'Post created Successfully', duration: 3000})

    console.log('creating post with ', user , this.post)
    this.db.createPost( user.uid, this.post)
    .subscribe(res => {
       // navigatin back to the home page on success
       this.navCtrl.parent.select(0);
       this.img.value = '',
       this.content.value = '';
      toast.present();
      loader.dismiss()
    })

  }
}
