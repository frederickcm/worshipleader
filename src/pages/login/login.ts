import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import {AngularFireAuth} from "angularfire2/auth"
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

user : {email:string , password:string};

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth:AngularFireAuth, private toast:ToastController) {
  	 this.user ={email:'',password:''}
  }

  async login(user){ 
    try {

      let result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      if(result){
      	this.navCtrl.setRoot(HomePage);
      }
    } catch (error) {
    	console.log(error);
      
               this.toast.create({
                message:error.message,
                duration:3000,
              }).present();  

    }

}

/*
signInWithGoogle() {
		this.afAuth.signInWithGoogle().then(() => this.navCtrl.setRoot(HomePage),error => console.log(error.message));
}*/


signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
}
 

private oauthSignIn(provider: AuthProvider) {
	if (!(<any>window).cordova) {
		return this.afAuth.auth.signInWithPopup(provider);
	} else {
		return this.afAuth.auth.signInWithRedirect(provider)
		.then(() => {
			return this.afAuth.auth.getRedirectResult().then( result => {
				// This gives you a Google Access Token.
				// You can use it to access the Google API.
				let token = result.credential.accessToken;
				// The signed-in user info.
				let user = result.user;
				console.log(token, user);
			}).catch(function(error) {
				// Handle Errors here.
				console.log(error.message);
			});
		});
	}
}


 

  register(){
  	this.navCtrl.push(RegisterPage);
  }

}
