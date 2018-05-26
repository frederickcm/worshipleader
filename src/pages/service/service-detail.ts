import { Component } from '@angular/core';
import { IonicPage, AlertController,ModalController,Modal } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { NavController, NavParams } from 'ionic-angular';
import { ServicePage } from './service';
import { SongListPage } from './songList';
 
@IonicPage()
@Component({
  selector: 'page-service-detail',
  templateUrl: 'service-detail.html'
})
export class ServiceDetailPage {

  serviceRef: AngularFireList<any>;

  item: {name: string, begindate: string, songs:Array<any>};
    

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase,
    public navParams: NavParams,
    public modal: ModalController
  ) {

  	
  	this.serviceRef = this.database.list('service');

    this.item = navParams.get('item');

    if(typeof this.item =='undefined'){
       this.item ={name: '',begindate: new Date().toISOString(),songs:[]};
      }

  } 

  reorderItems(indexes) {
    let element = this.item.songs[indexes.from];
    this.item.songs.splice(indexes.from, 1);
    this.item.songs.splice(indexes.to, 0, element);
  }

  openListSong(item) {
    const myModal: Modal = this.modal.create(SongListPage);
    myModal.present();
    myModal.onDidDismiss((data)=>{

      if(typeof data !='undefined'){
       this.item.songs.push(data);
      } 
    }
    );
  }

  deleteSong(item) {
    let index = this.item.songs.indexOf(item);

    if(index > -1){
      this.item.songs.splice(index, 1);
    }
  }


  addService(service){
		this.serviceRef.push({
      name: service.name,
      begindate: service.begindate,
      songs: service.songs
      }
	  ); 


 	const alert = this.alertCtrl.create({
      title: 'Saved!',
      buttons: ['Ok']
    });

    alert.present();

	this.navCtrl.push(ServicePage);
  
  }

  updateService( service ){
    this.serviceRef.update( service.key,{
      name: service.name,
      begindate: service.begindate,
      songs: service.songs
    });

 	const alert = this.alertCtrl.create({
      title: 'Perfecto!',
      subTitle: 'Se han guardado los cambios!',
      buttons: ['Ok']
    });

    alert.present();

	this.navCtrl.push(ServicePage);

  }





}
