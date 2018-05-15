import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MemberPage } from '../pages/member/member';
import { MemberDetailPage } from '../pages/member/member-detail';
import { ServicePage } from '../pages/service/service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


export const firebaseConfig = {
apiKey: "AIzaSyBD30rDf8OkFh4tgZM5JKKD8akuHLmR3a0",
    authDomain: "worshipleader-38619.firebaseapp.com",
    databaseURL: "https://worshipleader-38619.firebaseio.com",
    projectId: "worshipleader-38619",
    storageBucket: "worshipleader-38619.appspot.com",
    messagingSenderId: "999549556335"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MemberPage,
    MemberDetailPage,
    ServicePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig,'WorshipLeader'),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MemberPage,
    MemberDetailPage,
    ServicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
