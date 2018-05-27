import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,ViewController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-songList',
  templateUrl: 'songList.html'
})
export class SongListPage {

  songRef: AngularFireList<any>;
  song: Observable<any[]>;

/*  tunning =['','C','C#','D','D#','E','F','F#','G','G#','A','A#','B','Cm','C#m','Dm','D#m','Em','Fm','F#m','Gm','G#m','Am','A#m','Bm'];
  selectTune = '';*/

  mySongList:Observable<any[]>;

  songSearchBar:string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase,
    public view: ViewController
  ) {

  	 
    this.songRef = this.database.list('song');
    this.song = this.songRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({
       key: c.payload.key, ...c.payload.val() }));
    }); 

    this.mySongList=this.song;

  }



   closeModal(){
    this.view.dismiss();
  } 

  setSelectedSong(item){
    this.view.dismiss(item);
  } 



	toFilterSong(item) {
	  // set q to the value of the searchbar
	  var q = this.songSearchBar;


	  // if the value is an empty string don't filter the items
	  if (!q) {
	  	this.song = this.mySongList;
	    return;
	  }


  	this.song = this.mySongList.map(x => {
      return x.filter(
                y=> { 
                      if(y.name.toLowerCase().indexOf(q.toLowerCase())>-1 || (typeof(y.tune) != 'undefined' && y.tune.toLowerCase().indexOf(q.toLowerCase())>-1)   ){
                        return true;
                      }  
                    }
              );
    });   

	}


/*

initItems(qty, serchQuery="guttenavan") {
  return this.afService.database.list('/', {
          query: {
            limitToFirst: qty,
            orderByChild: 'word',  // Search field
            equalTo: serchQuery
          }
        })
}

getItems(ev) {

    this.initItems(50);

    var val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.initItems(9999, val.toLowerCase());
      console.log(val.toLowerCase());
    }
  }
*/



}
