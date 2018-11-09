import { Component, ViewChild,NgZone  } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MemberPage } from '../pages/member/member'; 
import { SongPage } from '../pages/song/song'; 
import { ServicePage } from '../pages/service/service';
import { TalentPage } from '../pages/talent/talent';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
//import { GooglePlus } from '@ionic-native/google-plus';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public afAuth: AngularFireAuth) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
    
      { title: 'Home', component: HomePage, icon:'home' },
      { title: 'Services', component: ServicePage, icon:'clipboard' },
      { title: 'Songs', component: SongPage, icon:'musical-notes' },
      { title: 'Members', component: MemberPage, icon:'contacts' },
      { title: 'Talents', component: TalentPage, icon:'color-palette' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();



        /* this.zone.run(() => {
          this.checkLogin();
        });*/

    });

            this.afAuth.authState.subscribe(
          user => {
            if (user) {
              this.rootPage = HomePage;
            } else {
              this.rootPage = LoginPage;
            }
          },
          () => {
            this.rootPage = LoginPage;
          }
        );
  }

/*
  async checkLogin(){
    try {
      let status = await this.gplus.trySilentLogin({});
      console.log(status);
    } catch (error) {
      this.rootPage = RegisterPage;
    }
  }*/

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  exitApp(){
    this.afAuth.auth.signOut();
    //this.afAuth.logout();
     //this.platform.exitApp();
  }
}
