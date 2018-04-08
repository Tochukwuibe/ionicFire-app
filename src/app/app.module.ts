import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// firebase stuff
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import { Firebase } from '@ionic-native/firebase';

import { environment } from '../environment/environment';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';
import { ComponentsModule } from '../components/components.module';
import { Facebook } from '@ionic-native/facebook';
import { DatabaseProvider } from '../providers/database/database';



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ComponentsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,


  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Firebase,
    DatabaseProvider,
   
  ]
})
export class AppModule {}
