import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';

import { MemberPage } from '../member/member'; 
import { SongPage } from '../song/song'; 
import { ServicePage } from '../service/service';
import { TalentPage } from '../talent/talent';
import {AngularFireAuth} from "angularfire2/auth"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController,private afAuth:AngularFireAuth, private toast:ToastController) {

  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data.email && data.uid){
        this.toast.create({
          message:"Welcome to "+this.afAuth.app.name,
          duration:3000
        }).present();
        
      }else{
              this.toast.create({
                message:"We cant found you!",
                duration:3000
              }).present();
      }
    });
  }

  openPageService() {
    this.navCtrl.push(ServicePage);
  }
  openPageSong() {
    this.navCtrl.push(SongPage);
  }
  openPageMember() {
    this.navCtrl.push(MemberPage);
  }
  openPageTalent() {
    this.navCtrl.push(TalentPage);
  }

}
