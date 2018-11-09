import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';

import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-registergoogle',
  templateUrl: 'registergoogle.html'
})
export class RegisterGooglePage {

  text: string;
  user: Observable<firebase.User>;
 

  constructor(
    private afAuth: AngularFireAuth, 
    private gplus: GooglePlus,
    private platform: Platform,
    public navCtrl: NavController
  ) {
    
    this.user = this.afAuth.authState; 

  }

  

 googleLogin() {
  if (this.platform.is('cordova')) {
    console.log('nativo');
    this.nativeGoogleLogin();
  } else {
    this.waitingWEB();
  }
}


async nativeGoogleLogin(): Promise<void> {
  try {

    const gplusUser = await this.gplus.login({
      'webClientId': '222340753174-tgeri66rdedept0gcfgteghocu8eh1ka.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'profile email'
    })



    return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))

  } catch(err) {
    console.log(err)
  }
}

async webGoogleLogin(): Promise<void> {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return credential;
  } catch(err) {
    console.error("window.plugins.googleplus.login",err)
  }

} 


async waitingWEB(): Promise<void> {
  await this.webGoogleLogin();
  this.navCtrl.push(HomePage);
}

async waitingNative(): Promise<void> {

  await this.nativeGoogleLogin();
  this.navCtrl.push(HomePage);
}




signOut() {
  this.afAuth.auth.signOut();
}




}
