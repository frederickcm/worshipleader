import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MemberPage } from '../member/member'; 
import { SongPage } from '../song/song'; 
import { ServicePage } from '../service/service';
import { TalentPage } from '../talent/talent';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {

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
