import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { NavController, NavParams } from 'ionic-angular';
import { SongPage } from './song';

@IonicPage()
@Component({
  selector: 'page-song-detail',
  templateUrl: 'song-detail.html'
})
export class SongDetailPage {

  songRef: AngularFireList<any>;
  item: {name: string, detail: string};

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase,
    public navParams: NavParams
  ) {
  	
  	this.songRef = this.database.list('song');
    this.item = navParams.get('item');
    if(typeof this.item =='undefined'){this.item ={name: '', detail: ''};} 
  }


  addSong(song){
		this.songRef.push({
	      name: song.name,
	      detail: song.detail}
	  );


 	const alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Se ha agregado un nuevo miembro!',
      buttons: ['Ok']
    });

    alert.present();

	this.navCtrl.push(SongPage);
  
  }

  updateSong( song ){
    this.songRef.update( song.key,{
      name: song.name,
      detail: song.detail
    });

 	const alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Se han guardado los cambios!',
      buttons: ['Ok']
    });

    alert.present();

	this.navCtrl.push(SongPage);

  }





}
