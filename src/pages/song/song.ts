import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { SongDetailPage } from './song-detail';

@IonicPage()
@Component({
  selector: 'page-song',
  templateUrl: 'song.html'
})
export class SongPage {

  songRef: AngularFireList<any>;
  song: Observable<any[]>;

  mySongList:Observable<any[]>;

  songSearchBar:string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    this.songRef = this.database.list('song');
    this.song = this.songRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }); 

    this.mySongList=this.song;
  }
/*
  createSong(){
    let newSongModal = this.alertCtrl.create({
      title: 'Agregar ministro',
      message: "Favor completar la información",
      inputs: [
        {
          name: 'Nombre',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cerrar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.songRef.push({
              title: data.title,
              done: false
            });
          }
        }
      ]
    });
    newSongModal.present( newSongModal );
  }*/


  toFilterSong(item) {
    // set q to the value of the searchbar
    var q = this.songSearchBar;


    // if the value is an empty string don't filter the items
    if (!q) {
      this.song = this.mySongList;
      return;
    }


 
      this.song = this.mySongList.map(x => {
             return x.filter(y=>y.name.toLowerCase().indexOf(q.toLowerCase())>-1);
        })   

  }
  
  addNewSong() {
    this.navCtrl.push(SongDetailPage);
  }

  viewSong(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SongDetailPage, {
      item: item
    });
  }


  removeSong( song ){
    console.log( song );
    this.songRef.remove( song.key );
  }

}
