import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { AngularFireAuthModule } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus'; // We'll install this in the next section


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MemberPage } from '../pages/member/member';
import { MemberDetailPage } from '../pages/member/member-detail';
import { SongPage } from '../pages/song/song';
import { SongDetailPage } from '../pages/song/song-detail';
import { SongListPage } from '../pages/service/songList';
import { ServicePage } from '../pages/service/service';
import { ServiceDetailPage } from '../pages/service/service-detail';
import { TalentPage } from '../pages/talent/talent';
import { RegisterPage } from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


export const firebaseConfig = {
   apiKey: "AIzaSyAe2Ma_JY2I-s4Iz0EQAm0u6MeotmvQRpQ",
    authDomain: "worshipleader-7c45d.firebaseapp.com",
    databaseURL: "https://worshipleader-7c45d.firebaseio.com",
    projectId: "worshipleader-7c45d",
    storageBucket: "worshipleader-7c45d.appspot.com",
    messagingSenderId: "858343029060"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MemberPage,
    MemberDetailPage,
    SongPage,
    SongDetailPage,
    SongListPage,
    ServicePage,
    ServiceDetailPage,
    TalentPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,'WorshipLeader'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MemberPage,
    MemberDetailPage,
    SongPage,
    SongDetailPage,
    SongListPage,
    ServicePage,
    ServiceDetailPage,
    TalentPage,
    RegisterPage
  ],
  providers: [
    GooglePlus,
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
