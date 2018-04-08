import { NgModule } from '@angular/core';
import { AnonymousLoginComponent } from './anonymous-login/anonymous-login';
import { IonicModule } from 'ionic-angular';
import { FacebookLoginComponent } from './facebook-login/facebook-login';
import { UserLogoutComponent } from './user-logout/user-logout';
import { PostFeedComponent } from './post-feed/post-feed';
import { HeartButtonComponent } from './heart-button/heart-button';
import { UserRelationshipsComponent } from './user-relationships/user-relationships';
@NgModule({
	declarations: [AnonymousLoginComponent,
    FacebookLoginComponent,
    UserLogoutComponent,
    PostFeedComponent,
    HeartButtonComponent,
    UserRelationshipsComponent],
	imports: [IonicModule],
	exports: [AnonymousLoginComponent,
    FacebookLoginComponent,
    UserLogoutComponent,
    PostFeedComponent,
    HeartButtonComponent,
    UserRelationshipsComponent]
})
export class ComponentsModule {}
