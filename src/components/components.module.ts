import { NgModule } from '@angular/core';
import { AnonymousLoginComponent } from './anonymous-login/anonymous-login';
import { IonicModule } from 'ionic-angular';
import { FacebookLoginComponent } from './facebook-login/facebook-login';
import { UserLogoutComponent } from './user-logout/user-logout';
import { PostFeedComponent } from './post-feed/post-feed';
import { HeartButtonComponent } from './heart-button/heart-button';
import { UserRelationshipsComponent } from './user-relationships/user-relationships';
import { ImageUploadComponent } from './image-upload/image-upload';
import { UploadModalComponent } from './upload-modal/upload-modal';
import { FcmHandlerComponent } from './fcm-handler/fcm-handler';
import { FcmTopicComponent } from './fcm-topic/fcm-topic';
@NgModule({
	declarations: [AnonymousLoginComponent,
    FacebookLoginComponent,
    UserLogoutComponent,
    PostFeedComponent,
    HeartButtonComponent,
    UserRelationshipsComponent,
    ImageUploadComponent,
    UploadModalComponent,
    FcmHandlerComponent,
    FcmTopicComponent
    ],

	imports: [
        IonicModule
    ],
	exports: [
    AnonymousLoginComponent,
    FacebookLoginComponent,
    UserLogoutComponent,
    PostFeedComponent,
    HeartButtonComponent,
    UserRelationshipsComponent,
    ImageUploadComponent,
    FcmHandlerComponent,
    FcmTopicComponent,
   
],
    entryComponents: [
        UploadModalComponent
    ]
})
export class ComponentsModule {}
