import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-song-detail',
  templateUrl: 'song-detail.html'
})
export class SongDetailPage {

  songRef: AngularFireList<any>;
  item: {name: string,artist: string,tune: string, detail: string};

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase,
    public navParams: NavParams
  ) {
  	
  	this.songRef = this.database.list('song');
    this.item = navParams.get('item');
    if(typeof this.item =='undefined'){this.item ={name: '',tune: '',artist: '', detail: ''};} 
  }


  addSong(song){
		this.songRef.push({
	      name: song.name,
        artist: song.artist,
        tune: song.tune,
	      detail: song.detail}
	  );


 	const alert = this.alertCtrl.create({
      title: 'Saved!',
      buttons: ['Ok']
    });

    alert.present();

	this.navCtrl.pop();
  
  }

  updateSong( song ){
    this.songRef.update( song.key,{
      name: song.name,
      artist: song.artist,
      tune: song.tune,
      detail: song.detail
    });

 	const alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Se han guardado los cambios!',
      buttons: ['Ok']
    });

    alert.present();

	this.navCtrl.pop();

  }





}
