import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth"
import { HomePage } from '../home/home';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})



export class RegisterPage {

  @ViewChild(Slides) slides: Slides;

  user : {name:string,account:string,password:string};

  userTypeSelected: {id:number,description:string};
  groupTypeSelected:number;

  group:{name:string,id:string};


  userTypeList:[any];
  groupTypeList:[any];


  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth:AngularFireAuth, private toast:ToastController) {
  	this.user ={account:'',password:'',name:''};
    this.userTypeList=[{id:1,description:'I am a Leader'},{id:2,description:'I am a Musician'}];
    this.groupTypeList=[{id:1,description:'New Group'},{id:0,description:'Join a Group'}];
    this.userTypeSelected = {id:0,description:''};
    this.groupTypeSelected = 1;
    this.group ={id:'',name:''};
  }

  async register(user){ 
    try {
      let result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
      if(result){
      	this.navCtrl.setRoot(HomePage);
      }
    } catch (error) {
    	console.log(error.message);

               this.toast.create({
                message:error.message,
                duration:3000,
              }).present();      

      

    }

}


  closeRegister(){
    this.navCtrl.pop();
  }

  goNext() {

    this.slides.slideTo(this.slides.getActiveIndex()+1, 500);
  }

  goBack() {
    this.slides.slideTo(this.slides.getActiveIndex()-1, 500);
  }


    ver() {
        console.log(this.groupTypeSelected);
    }


}
